import React, { useState } from "react";
import { Container, VStack, FormControl, FormLabel, Input, Button, useToast, Text, Box } from "@chakra-ui/react";
import { FaPrint } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: "",
    sampleInfo: "",
  });
  const [uniqueNumber, setUniqueNumber] = useState(null);
  const [isSubmitted, setSubmitted] = useState(false);

  const generateUniqueNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.email || !formData.sampleInfo) {
      toast({
        title: "Error",
        description: "Please fill out all fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const uniqueId = generateUniqueNumber();
    setUniqueNumber(uniqueId);
    setSubmitted(true);

    // Here you would send the email and form data to the backend
    // Since we can't actually send emails, this is just a placeholder
    toast({
      title: "Success",
      description: `Form submitted! Your unique number is ${uniqueId}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const printLabel = () => {
    // In a real application you would typically use a library like `react-to-print` to handle printing.
    // Since we can't use additional libraries, we will just log to the console.
    console.log(`Printing shipping label: Cyklop CSC Att.: SampleLab M.Slot [${uniqueNumber}] Wilhelm Röntgenstraat 10, 8013NC, Zwolle, Nederland`);
  };

  return (
    <Container maxW="container.md" py={8} centerContent>
      <Box w="full" p={8} bg="#002F5D" color="white" borderRadius="lg" boxShadow="lg">
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input type="email" name="email" value={formData.email} onChange={handleInputChange} bg="white" color="black" />
          </FormControl>
          <FormControl id="sampleInfo" isRequired>
            <FormLabel>Sample Information</FormLabel>
            <Input type="text" name="sampleInfo" value={formData.sampleInfo} onChange={handleInputChange} bg="white" color="black" />
          </FormControl>
          <Button type="submit" colorScheme="green" size="lg" leftIcon={<FaPrint />} isLoading={isSubmitted} loadingText="Submitting">
            Submit
          </Button>
          {isSubmitted && (
            <Text>
              Unique Number: <strong>{uniqueNumber}</strong>
            </Text>
          )}
          {isSubmitted && (
            <Button onClick={printLabel} colorScheme="green" size="lg" leftIcon={<FaPrint />} mt={4}>
              Print Shipping Label
            </Button>
          )}
        </VStack>
      </Box>
    </Container>
  );
};

export default Index;
