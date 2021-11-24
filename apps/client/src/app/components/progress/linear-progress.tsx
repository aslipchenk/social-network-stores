import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const ProgressContext = React.createContext({
  toggleProgressBar: () => {
  }
});

export function useProgressBar() {
  return React.useContext(ProgressContext);
}

export default function LinearProgressBar(props: any) {
  const [show, setShown] = React.useState(false);

  function toggleProgressBar() {
    setShown(prev => !prev);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <ProgressContext.Provider value={{ toggleProgressBar }}>
        {show && <LinearProgress />}
        {props.children}
      </ProgressContext.Provider>
    </Box>
  );
}
