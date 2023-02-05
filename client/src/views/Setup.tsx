import { Avatar, Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { CreateAdmin } from "../view-components/CreateAdmin";
import React from "react";
import StorageIcon from '@mui/icons-material/Storage';
import TestConnection from "../view-components/TestConnection";

const steps = ["Setup Database Connection", "Setup Admin Account", "Profit"]

export function Setup() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [connectionOk, setConnectionOk] = React.useState(false);
  const [credsOk, setCredsOk] = React.useState(false);

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <TestConnection setConnectionOk={setConnectionOk}/>
      case 1:
        return <CreateAdmin setCredsOk={setCredsOk}/>
    }
  }

  const handleNextClick = (e: any) => {
    const step = activeStep + 1 === steps.length ? 0 : activeStep + 1;
    setActiveStep(step);
  }

  const isNextDisabled = () => {
    switch (activeStep) {
      case 0:
        return !connectionOk;
      case 1:
        return !credsOk;
      default:
        return true;
    }
  }

  return (
    <>
      <Box
       sx={{
         marginTop: 1,
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
       }}
     >
      <Typography component="h1" variant="h5">Get started</Typography>
       <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
         <StorageIcon />
       </Avatar>
     </Box>

      <Stepper activeStep={activeStep}>
        {steps.map(stepLabel => (
          <Step key={stepLabel}>
            <StepLabel>{stepLabel}</StepLabel>
          </Step>
        ))
      }

      </Stepper>
      { renderStepContent(activeStep) }
      <Button
        onClick={handleNextClick}
        disabled={isNextDisabled()}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2}}
      >
        { activeStep + 1 === steps.length ? "Finish" : "Next "}
      </Button>
    </>
  )
}