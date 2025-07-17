"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmationDialogProps {
  open: boolean;
  message: string;
  onSubmit: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  message,
  onSubmit,
  onCancel,
}) => {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Confirmation
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 text-start text-base text-gray-700">
          {message || "Are you sure you want to proceed?"}
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            End Interview
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;

// Example usage:
// <ConfirmationDialog
//   open={isDialogOpen}
//   message="Are you sure you want to end the interview?"
//   onSubmit={handleEndInterview}
//   onCancel={handleCancel}
// />
