import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { CelestialFormDialog } from "./CelestialFormDialog";
import { betelgeuse } from "../mocks/celestialObjects";

const meta = {
  title: "Catalogue/CelestialFormDialog",
  component: CelestialFormDialog,
  args: {
    initialValue: null,
    isSubmitting: false,
    onClose: fn(),
    onSubmit: fn(),
  },
} satisfies Meta<typeof CelestialFormDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Creation: Story = {};

export const Modification: Story = {
  args: { initialValue: betelgeuse },
};

export const EnregistrementEnCours: Story = {
  args: { initialValue: betelgeuse, isSubmitting: true },
};
