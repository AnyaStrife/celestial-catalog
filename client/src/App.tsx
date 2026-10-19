import { useState } from "react";
import {
  Alert,
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { CelestialTable } from "./components/CelestialTable";
import { CelestialFormDialog } from "./components/CelestialFormDialog";
import { ConfirmDeleteDialog } from "./components/ConfirmDeleteDialog";
import {
  useCelestialObjects,
  useCreateCelestialObject,
  useDeleteCelestialObject,
  useUpdateCelestialObject,
} from "./hooks";
import { getErrorMessage } from "./api";
import type { CelestialObject, CelestialObjectInput } from "./types";

type Feedback = { severity: "success" | "error"; message: string };

export default function App() {
  const {
    data: objects = [],
    isPending,
    isError,
    error,
  } = useCelestialObjects();
  const createMutation = useCreateCelestialObject();
  const updateMutation = useUpdateCelestialObject();
  const deleteMutation = useDeleteCelestialObject();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<CelestialObject | null>(null);
  const [toDelete, setToDelete] = useState<CelestialObject | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (object: CelestialObject) => {
    setEditing(object);
    setFormOpen(true);
  };

  const showError = (err: unknown) =>
    setFeedback({ severity: "error", message: getErrorMessage(err) });

  const handleSubmit = (data: CelestialObjectInput) => {
    const onSuccess = () => {
      setFormOpen(false);
      setFeedback({
        severity: "success",
        message: editing ? "Objet modifié" : "Objet ajouté",
      });
    };
    if (editing) {
      updateMutation.mutate(
        { id: editing.id, data },
        { onSuccess, onError: showError },
      );
    } else {
      createMutation.mutate(data, { onSuccess, onError: showError });
    }
  };

  const handleConfirmDelete = () => {
    const target = toDelete;
    if (!target) return;
    deleteMutation.mutate(target.id, {
      onSuccess: () => {
        setToDelete(null);
        setFeedback({
          severity: "success",
          message: `« ${target.name} » supprimé`,
        });
      },
      onError: showError,
    });
  };

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <AutoAwesomeIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            Catalogue Céleste
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openCreate}
          >
            Ajouter
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {isPending && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        )}
        {isError && <Alert severity="error">{getErrorMessage(error)}</Alert>}
        {!isPending && !isError && (
          <CelestialTable
            objects={objects}
            onEdit={openEdit}
            onDelete={setToDelete}
          />
        )}
      </Container>

      {formOpen && (
        <CelestialFormDialog
          initialValue={editing}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
          onClose={() => setFormOpen(false)}
          onSubmit={handleSubmit}
        />
      )}

      <ConfirmDeleteDialog
        object={toDelete}
        isDeleting={deleteMutation.isPending}
        onCancel={() => setToDelete(null)}
        onConfirm={handleConfirmDelete}
      />

      <Snackbar
        open={feedback !== null}
        autoHideDuration={4000}
        onClose={() => setFeedback(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={feedback?.severity ?? "success"}
          variant="filled"
          onClose={() => setFeedback(null)}
        >
          {feedback?.message}
        </Alert>
      </Snackbar>
    </>
  );
}
