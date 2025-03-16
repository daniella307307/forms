import React from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function ValidateLogin() {
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const response = await fetch("https://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Sign-up successful");
      } else {
        Alert.alert("Error", result.message || "Sign-up failed");
      }
    } catch (error) {
      Alert.alert("Error", "Network error, please try again");
    }
    setSubmitting(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <>
            <TextInput
              style={[styles.input, touched.name && errors.name && styles.inputError]}
              placeholder="Your Name"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <TextInput
              style={[styles.input, touched.email && errors.email && styles.inputError]}
              placeholder="Your Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
              style={[styles.input, touched.password && errors.password && styles.inputError]}
              placeholder="Your Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <Button
              title={isSubmitting ? "Signing Up..." : "Sign Up"}
              onPress={()=>{handleSubmit}}
              disabled={isSubmitting}
            />
            {isSubmitting && <Text style={styles.loadingText}>Submitting your information...</Text>}
            <TouchableOpacity onPress={() => Alert.alert("Already have an account?")}>
              <Text style={styles.linkText}>Already have an account? Sign In</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
  loadingText: {
    color: "#999",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
  linkText: {
    color: "#1e90ff",
    textAlign: "center",
    marginTop: 15,
  },
});
