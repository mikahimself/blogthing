import { Avatar, Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { CreateAdmin } from "../view-components/CreateAdmin";
import React from "react";
import StorageIcon from '@mui/icons-material/Storage';
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

  const handleNextClick = (e: any) => {
    const step = activeStep === steps.length ? 0 : activeStep + 1;
    setActiveStep(step);
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
        // type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2}}
      >
        Next
      </Button>
    </>
  )






}