import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { CelestialTable } from "./CelestialTable";
import { celestialObjects } from "../mocks/celestialObjects";

const meta = {
  title: "Catalogue/CelestialTable",
  component: CelestialTable,
  args: {
    objects: celestialObjects,
    onEdit: fn(),
    onDelete: fn(),
  },
} satisfies Meta<typeof CelestialTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AvecDesObjets: Story = {};

export const ListeVide: Story = {
  args: { objects: [] },
};
