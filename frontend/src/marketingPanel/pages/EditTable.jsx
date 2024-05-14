import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { MenuItem } from "@mui/material";

const EditPromotionDialog = ({ promotion, onSave, onClose }) => {
  const [editedPromotion, setEditedPromotion] = useState({ ...promotion });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPromotion((prevPromotion) => ({
      ...prevPromotion,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5001/api/userpromo/updatepromotion/${promotion._id}`,
        editedPromotion
      );
      onSave(response.data.data);
      onClose();
    } catch (error) {
      console.error("Error:", error);
      // Handle error appropriately, e.g., show error message to user
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={true} onClose={handleCancel}>
      <DialogTitle>Edit Promotion</DialogTitle>
      <DialogContent>
        <TextField
          label="Promotion Name"
          name="promotionName"
          value={editedPromotion.promotionName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Promotion Key"
          name="promotionKey"
          value={editedPromotion.promotionKey}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          value={editedPromotion.startDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End Date"
          name="endDate"
          type="date"
          value={editedPromotion.endDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="User Email"
          name="userEmail"
          value={editedPromotion.userEmail}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Number"
          name="number"
          value={editedPromotion.number}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Promotion Type"
          name="promotionType"
          select
          value={editedPromotion.promotionType}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="Promotion">Promotion</MenuItem>
          <MenuItem value="Discount">Discount</MenuItem>
        </TextField>
        <TextField
          label="Description"
          name="description"
          value={editedPromotion.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPromotionDialog;
