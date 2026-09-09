import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert } from "react-native";
import { useTheme } from "@/src/theme";
import { Button } from "@/src/components/Button";
import { TextInput } from "@/src/components/TextInput";
import { useRouter } from "expo-router";
import { useState } from "react";
import axiosClient from "@/src/apis/axios-client";
import ApiEndpoints from "@/src/apis/api-endpoints";
import { authStorage } from "@/src/storage/auth";
import { IconSymbol } from "@/src/components/ui/icon-symbol";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupScreen() {
  const { colors, typography, radii } = useTheme();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation — exactly 6 characters
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length !== 6) {
      newErrors.password = "Password must be exactly 6 characters";
    }

    // Confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (loading) return; // Prevent double-clicks
    if (!validate()) return;

    try {
      setLoading(true);
      // 1. Register the user
      await axiosClient.post(ApiEndpoints.REGISTER, {
        name: name.trim(),
        email: email.trim(),
        password,
      });

      // 2. The register endpoint returns a user object (id, name, email) but NO token.
      // So we immediately login to get the access token.
      const loginResponse = await axiosClient.post(ApiEndpoints.LOGIN, {
        email: email.trim(),
        password,
      });

      const token = loginResponse.data?.access_token;
      if (token) {
        await authStorage.setToken(token);
        router.replace("/(tabs)");
      } else {
        throw new Error("Did not receive access token after login.");
      }
    } catch (error: any) {
      Alert.alert("Sign Up Failed", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surface }]}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text 
              style={[typography.bodyBold, { color: colors.textSecondary }]}
              onPress={() => router.back()}
            >
              Log In
            </Text>
          </View>

          <View style={styles.topSection}>
            <Text style={[typography.display, { color: colors.textPrimary, textAlign: "center", marginBottom: 8 }]}>
              Welcome
            </Text>
            <Text style={[typography.bodyBold, { color: colors.textSecondary, textAlign: "center" }]}>
              It's time to be productive
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: colors.surface, borderRadius: radii.banner, shadowColor: colors.primary }]}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBox, { backgroundColor: colors.primaryMuted, borderRadius: radii.md }]}>
                <IconSymbol name="person.crop.circle.badge.plus" size={24} color={colors.primary} />
              </View>
              <View>
                <Text style={[typography.heading2, { color: colors.textPrimary }]}>Sign Up</Text>
                <Text style={[typography.small, { color: colors.textSecondary }]}>Enter Your Credentials to continue</Text>
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <TextInput
              label="Name"
              placeholder="Full Name"
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              autoCapitalize="words"
              icon="person"
              error={errors.name}
            />

            <TextInput
              label="Email"
              placeholder="Email Address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              autoCapitalize="none"
              keyboardType="email-address"
              icon="envelope"
              error={errors.email}
            />
            
            <TextInput
              label="Password"
              placeholder="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              secureTextEntry
              maxLength={6}
              icon="lock"
              error={errors.password}
            />

            <TextInput
              label="Confirm Password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
              }}
              secureTextEntry
              maxLength={6}
              icon="lock"
              error={errors.confirmPassword}
            />

            <View style={styles.buttonContainer}>
              <Button
                title={loading ? "Loading..." : "Let's Start"}
                onPress={handleSignup}
                disabled={loading}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  topSection: {
    paddingVertical: 40,
    alignItems: "center",
  },
  card: {
    flex: 1,
    padding: 24,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  iconBox: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  divider: {
    height: 1,
    width: "100%",
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 32,
  },
});
