import React, { useState, useEffect, useRef } from "react";
import { usePDF } from "react-to-pdf";
import {
  Grid,
  GridItem,
  Box,
  Text,
  Button,
  useToast,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Divider,
  Stack,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
import { saveAs } from "file-saver";
import SideNavigation from "./Component/SideNavigation";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { useReactToPrint } from "react-to-print";

const DashboardReport = () => {
  const [parcels, setParcels] = useState([]);
  const [totalParcels, setTotalParcels] = useState(0);
  const [deliveredParcels, setDeliveredParcels] = useState(0);
  const [pendingParcels, setPendingParcels] = useState(0);
  const [inTransitParcels, setInTransitParcels] = useState(0);
  const [totalDeliveryCost, setTotalDeliveryCost] = useState(0);
  const toast = useToast();
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  //print section

  useEffect(() => {
    fetchParcels();
  }, []);

  const fetchParcels = async () => {
    try {
      const response = await axios.get("http://localhost:5001/admin/parcels");
      const parcelsData = response.data.parcels;
      setParcels(parcelsData);

      // Calculate totals
      let totalCost = 0;
      let deliveredCount = 0;
      let pendingCount = 0;
      let inTransitCount = 0;

      parcelsData.forEach((parcel) => {
        totalCost += parcel.deliveryCost;

        if (parcel.status === "Delivered") {
          deliveredCount++;
        } else if (parcel.status === "Pending") {
          pendingCount++;
        } else if (parcel.status === "In Transit") {
          inTransitCount++;
        }
      });

      setTotalDeliveryCost(totalCost);
      setTotalParcels(parcelsData.length);
      setDeliveredParcels(deliveredCount);
      setPendingParcels(pendingCount);
      setInTransitParcels(inTransitCount);
    } catch (error) {
      console.error("Error fetching parcels:", error);
      toast({
        title: "Error",
        description: "Failed to fetch parcels. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const generateReport = () => {
    // Format data for report
    const reportData = {
      totalParcels,
      deliveredParcels,
      pendingParcels,
      inTransitParcels,
      totalDeliveryCost,
    };

    // Convert data to PDF or any other format as needed
    // Here, I'm just logging the data for demonstration
    console.log("Report Data:", reportData);
  };

  const calculatePercentage = (count) => {
    return ((count / totalParcels) * 100).toFixed(2);
  };

  return (
    <Grid
      templateAreas={`"nav main"`}
      gridTemplateRows={"1fr"}
      gridTemplateColumns={"250px 1fr"}
      h="100vh"
      gap="1"
    >
      <GridItem pl="2" area={"nav"}>
        <SideNavigation />
      </GridItem>

      <GridItem pl="2" area={"main"} className="grid_second">
        <Box
          mx="auto"
          p={8}
          boxShadow="2xl"
          borderRadius="xl"
          m={4}
          width="100%"
          className="adminPanel"
        >
          <Box ref={targetRef} mx="auto">
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Dashboard Report
            </Text>
            <Box>
              <Flex>
                <Stat>
                  <StatLabel>Total Parcels:</StatLabel>
                  <StatNumber>{totalParcels}</StatNumber>
                  <StatHelpText>April - May </StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel>Total Delivery Cost:</StatLabel>
                  <StatNumber> රු{totalDeliveryCost.toFixed(2)}</StatNumber>
                  <StatHelpText>April - May </StatHelpText>
                </Stat>
              </Flex>

              <Stack direction="row" p={4}>
                <Divider orientation="vertical" />
                <TableContainer>
                  <Table variant="simple">
                    <TableCaption>
                      Report of Parcel Delivery Status
                    </TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Delivered</Th>
                        <Th>In Transit</Th>
                        <Th isNumeric>Pending</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>
                          <Box mt={4}>
                            <CircularProgress
                              value={calculatePercentage(deliveredParcels)}
                              color="green.400"
                              size="100px"
                              thickness="4px"
                              fontSize="6xl"
                            >
                              <CircularProgressLabel>
                                {calculatePercentage(deliveredParcels)}%
                              </CircularProgressLabel>
                            </CircularProgress>
                          </Box>
                        </Td>
                        <Td>
                          {" "}
                          <Box mt={4}>
                            <CircularProgress
                              value={calculatePercentage(inTransitParcels)}
                              color="orange"
                              size="100px"
                              thickness="4px"
                              fontSize="6xl"
                            >
                              <CircularProgressLabel>
                                {calculatePercentage(inTransitParcels)}%
                              </CircularProgressLabel>
                            </CircularProgress>
                          </Box>
                        </Td>
                        <Td isNumeric>
                          {" "}
                          <Box mt={4}>
                            <CircularProgress
                              value={calculatePercentage(pendingParcels)}
                              color="yellow"
                              size="100px"
                              thickness="4px"
                              fontSize="6xl"
                            >
                              <CircularProgressLabel>
                                {calculatePercentage(pendingParcels)}%
                              </CircularProgressLabel>
                            </CircularProgress>
                          </Box>
                        </Td>
                      </Tr>
                    </Tbody>
                    <Tfoot>
                      <Tr>
                        <Th>Count: {deliveredParcels}</Th>
                        <Th>Count: {inTransitParcels}</Th>
                        <Th isNumeric>Count: {pendingParcels}</Th>
                      </Tr>
                    </Tfoot>
                  </Table>
                </TableContainer>
              </Stack>

              <Text color="gray" fontSize="xs">
                Click the button below to generate a report of the dashboard
                data.
              </Text>
            </Box>
          </Box>
          <Button mt={4} colorScheme="blue" onClick={() => toPDF()} size="sm">
            Generate Report
          </Button>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default DashboardReport;
