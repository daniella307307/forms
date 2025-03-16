import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function FormHandling() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    Alert.alert("Form Submitted", JSON.stringify(formData, null, 2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <TextInput 
        style={styles.input}
        placeholder="Your Name"
        value={formData.name}
        onChangeText={(value) => handleChange("name", value)}
      />
      <TextInput 
        style={styles.input}
        placeholder="Your Email"
        value={formData.email}
        onChangeText={(value) => handleChange("email", value)}
        keyboardType="email-address"
      />
      <TextInput 
        style={[styles.input, styles.textArea]}
        placeholder="Your Message"
        value={formData.message}
        onChangeText={(value) => handleChange("message", value)}
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
  },
});
