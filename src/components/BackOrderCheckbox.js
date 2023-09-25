// BackOrderCheckbox.js

import React from 'react';
import { Checkbox, FormControlLabel } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
function BackOrderCheckbox({ checked, onChange }) {
  return (
    <FormControlLabel
      label="Back order"
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          color="primary"
          icon={
            <span
              style={{
                border: '2px solid #2196f3',
                borderRadius: 2,
                width: 26,
                height: 26,
                display: 'inline-block',
              }}
            />
          }
          checkedIcon={
            <span
              style={{
                border: '2px solid #2196f3',
                borderRadius: 2,
                width: 26,
                height: 26,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckIcon
                style={{
                  fontSize: 18,
                  color: '#2196f3',
                  fontWeight: 'bold',
                }}
              />
            </span>
          }
        />
      }
    />
  );
}

export default BackOrderCheckbox;
