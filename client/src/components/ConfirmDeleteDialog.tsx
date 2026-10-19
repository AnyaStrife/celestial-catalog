import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import type { CelestialObject } from "../types";

type Props = {
  object: CelestialObject | null;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmDeleteDialog({
  object,
  isDeleting,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <Dialog open={object !== null} onClose={onCancel}>
      <DialogTitle>Supprimer cet objet ?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          « {object?.name} » sera définitivement supprimé du catalogue.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Annuler</Button>
        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
          disabled={isDeleting}
        >
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
