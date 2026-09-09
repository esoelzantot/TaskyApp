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
import { Image } from "expo-image";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const { colors, typography, radii, spacing } = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (loading) return; // Prevent double-clicks
    if (!validate()) return;

    try {
      setLoading(true);
      const response = await axiosClient.post(ApiEndpoints.LOGIN, {
        email: email.trim(),
        password,
      });

      const token = response.data.access_token;
      if (token) {
        await authStorage.setToken(token);
        router.replace("/(tabs)");
      }
    } catch (error: any) {
      Alert.alert("Login Failed", error.message || "Please check your credentials");
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
            <Text style={[typography.bodyBold, { color: colors.textSecondary }]}>
              Log In
            </Text>
          </View>

          <View style={styles.topSection}>
            <Text style={[typography.display, { color: colors.textPrimary, textAlign: "center", marginBottom: 8 }]}>
              Welcome Back
            </Text>
            <Text style={[typography.bodyBold, { color: colors.textSecondary, textAlign: "center" }]}>
              It's time to be productive
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: colors.surface, borderRadius: radii.banner, shadowColor: colors.primary }]}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBox, { backgroundColor: colors.primaryMuted, borderRadius: radii.md }]}>
                <IconSymbol name="rectangle.portrait.and.arrow.right" size={24} color={colors.primary} />
              </View>
              <View>
                <Text style={[typography.heading2, { color: colors.textPrimary }]}>Log In</Text>
                <Text style={[typography.small, { color: colors.textSecondary }]}>Enter Your Credentials to continue</Text>
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

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

            <View style={styles.buttonContainer}>
              <Button
                title={loading ? "Loading..." : "Let's Start"}
                onPress={handleLogin}
                disabled={loading}
              />
            </View>

            <Text 
              style={[typography.bodyBold, { color: colors.primary, textAlign: 'center', marginTop: 16 }]}
              onPress={() => router.push("/(auth)/signup")}
            >
              Don't have an account? Sign Up
            </Text>
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
