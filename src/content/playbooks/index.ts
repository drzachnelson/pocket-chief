import type { Playbook } from "@/lib/types";
import { carotidEndarterectomyBovinePatchPlaybook } from "@/content/playbooks/carotid-endarterectomy-bovine-patch";
import { femoropoplitealBypassPlaybook } from "@/content/playbooks/femoropopliteal-bypass";
import { temporalArteryBiopsyPlaybook } from "@/content/playbooks/temporal-artery-biopsy";

export { carotidEndarterectomyBovinePatchPlaybook, femoropoplitealBypassPlaybook, temporalArteryBiopsyPlaybook };

export const libraryPlaybooks: Playbook[] = [
  carotidEndarterectomyBovinePatchPlaybook,
  femoropoplitealBypassPlaybook,
  temporalArteryBiopsyPlaybook,
];
