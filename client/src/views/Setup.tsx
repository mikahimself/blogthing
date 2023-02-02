import { Avatar, Step, StepLabel, Stepper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import StorageIcon from '@mui/icons-material/Storage';
import { CreateAdmin } from "../view-components/CreateAdmin";
import React from "react";
import TestConnection from "../view-components/TestConnection";

const steps = ["Setup Database Connection", "Setup Admin Account", "Profit"]

const renderStepContent = (step: number) => {
  switch (step) {
    case 0:
      return <TestConnection />
    case 1:
      return <CreateAdmin />
  }
}

export function Setup() {
  const [activeStep, setActiveStep] = React.useState(0);
  return (
    <>
    <Stepper activeStep={activeStep}>
      {steps.map(stepLabel => (
        <Step key={stepLabel}>
          <StepLabel>{stepLabel}</StepLabel>
        </Step>
      ))
      
    }

    </Stepper>
    { renderStepContent(activeStep) }
    </>
  )






  // return (
  //   <Box
  //     sx={{
  //       marginTop: 8,
  //       display: 'flex',
  //       flexDirection: 'column',
  //       alignItems: 'center',
  //     }}
  //   >
  //     <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
  //       <StorageIcon />
  //     </Avatar>
  //     <Typography component="h1" variant="h5">Get started</Typography>

      

  //     <CreateAdmin/>
      
  //   </Box>
  // )
}