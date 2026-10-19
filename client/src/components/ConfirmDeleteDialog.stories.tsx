import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";
import { andromeda } from "../mocks/celestialObjects";

const meta = {
  title: "Catalogue/ConfirmDeleteDialog",
  component: ConfirmDeleteDialog,
  args: {
    object: andromeda,
    isDeleting: false,
    onCancel: fn(),
    onConfirm: fn(),
  },
} satisfies Meta<typeof ConfirmDeleteDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ouverte: Story = {};

export const SuppressionEnCours: Story = {
  args: { isDeleting: true },
};
