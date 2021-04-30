import { tsParticles } from "tsparticles";

export default function loadParticles(elementID = "particles"): void {
  tsParticles.loadJSON(elementID, "/particles.json");
}
