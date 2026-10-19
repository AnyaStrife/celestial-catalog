import {
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { TYPE_LABELS } from "../types";
import type { CelestialObject } from "../types";

type Props = {
  objects: CelestialObject[];
  onEdit: (object: CelestialObject) => void;
  onDelete: (object: CelestialObject) => void;
};

export function CelestialTable({ objects, onEdit, onDelete }: Props) {
  // Display a message instead of an empty table when there are no objects.
  if (objects.length === 0) {
    return (
      <Paper sx={{ p: 6, textAlign: "center" }}>
        <Typography color="text.secondary">
          Aucun objet céleste pour l'instant. Ajoute le premier !
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Constellation</TableCell>
            <TableCell align="right">Distance (années-lumière)</TableCell>
            <TableCell align="center">Observé</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {objects.map((object) => (
            <TableRow key={object.id} hover>
              <TableCell>{object.name}</TableCell>
              <TableCell>
                <Chip label={TYPE_LABELS[object.type]} size="small" />
              </TableCell>
              <TableCell>{object.constellation ?? "—"}</TableCell>
              <TableCell align="right">
                {object.distanceLightYears.toLocaleString("fr-FR")}
              </TableCell>
              <TableCell align="center">
                {object.observed ? (
                  <CheckCircleIcon color="success" fontSize="small" />
                ) : (
                  <RadioButtonUncheckedIcon color="disabled" fontSize="small" />
                )}
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Modifier">
                  <IconButton
                    aria-label={`Modifier ${object.name}`}
                    onClick={() => onEdit(object)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Supprimer">
                  <IconButton
                    aria-label={`Supprimer ${object.name}`}
                    color="error"
                    onClick={() => onDelete(object)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
