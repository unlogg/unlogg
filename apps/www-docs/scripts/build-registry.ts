import { registry } from "../registry";
import { promises as fs } from "fs";
import type { z } from "zod";
import type { registryItemFileSchema } from "@/registry/schema";
import path from "path";

// const REGISTRY_BASE_PATH = process.cwd();

// For the registry, we want to use the path relative to the ui package in the monorepo
const REGISTRY_BASE_PATH = path.resolve(process.cwd(), "../../packages/ui");
const PUBLIC_FOLDER_BASE_PATH = "public/r";
const COMPLETE_REGISTRY_PATH = "public/registry.json";

// const REGISTRY_TYPE_FOLDERS: Record<string, string> = {
//     "registry:component": "components",
//     "registry:hook": "hooks",
//     "registry:lib": "lib",
//     "registry:block": "blocks",
// };

/**
 * bun run ./scripts/build-registry.ts
 *
 */
type File = z.infer<typeof registryItemFileSchema>;

async function writeFileRecursive(filePath: string, data: string) {
  const dir = path.dirname(filePath);

  try {
    await fs.mkdir(dir, { recursive: true });

    await fs.writeFile(filePath, data, "utf-8");
    // console.log(`File written to ${filePath}`);
  } catch (error) {
    console.error(`Error writing file ${filePath}`);
    console.error(error);
  }
}

const getComponentFiles = async (files: File[], registryType: string) => {
  const filesArrayPromises = (files ?? []).map(async (file) => {
    if (typeof file === "string") {
      //@ts-ignore
      const normalizedPath = file.startsWith("/") ? file : `/${file}`;
      const filePath = path.join(REGISTRY_BASE_PATH, normalizedPath);
      const fileContent = await fs.readFile(filePath, "utf-8");

      const fileName = normalizedPath.split("/").pop() || "";

      return {
        type: registryType,
        content: fileContent,
        path: normalizedPath,
        target: `/components/unlogg-ui/${fileName}`,
      };
    }
    // console.log("files", files);
    const normalizedPath = file.path.startsWith("/")
      ? file.path
      : `/${file.path}`.replace("@/", "");

    const filePath = path.join(REGISTRY_BASE_PATH, normalizedPath);

    const fileContent = await fs.readFile(filePath, "utf-8");

    const fileName = normalizedPath.split("/").pop() || "";

    const getTargetPath = (type: string) => {
      switch (type) {
        case "registry:hook":
          return `/hooks/${fileName}`;
        case "registry:lib":
          return `/lib/${fileName}`;
        default:
          return `/components/unlogg-ui/${fileName}`;
      }
    };

    const fileType =
      typeof file === "string" ? registryType : file.type || registryType;

    // Modify the import paths in the content
    let modifiedContent = fileContent;
    if (fileContent.includes("@unlogg/ui/components")) {
      modifiedContent = fileContent.replace(
        /@unlogg\/ui\/.*?([^/]+)$/gm,
        "@/components/ui/$1"
      );
    }
    if (fileContent.includes("@unlogg/ui/hooks")) {
      modifiedContent = fileContent.replace(
        /@unlogg\/ui\/.*?([^/]+)$/gm,
        "@/hooks/$1"
      );
    }

    return {
      type: fileType,
      content: modifiedContent,
      path: normalizedPath,
      target:
        typeof file === "string"
          ? getTargetPath(registryType)
          : file.target || getTargetPath(fileType),
    };
  });

  const filesArray = await Promise.all(filesArrayPromises);
  return filesArray;
};

/**
 * Generate a complete registry.json file that contains all registry items
 */
const generateCompleteRegistry = async () => {
  // Create a deep copy of the registry to avoid modifying the original
  const registryCopy = JSON.parse(JSON.stringify(registry));

  // Process each registry item to remove non-serializable properties
  const processedRegistry = registryCopy.map((item: any) => {
    // Remove the component property as it's a function and can't be serialized
    const { component, ...rest } = item;

    // If the registry item has files with content, keep that
    if (rest.files) {
      // Files are handled separately in individual JSON files
      // For the complete registry, we'll keep the file paths but not include contents
      rest.files = rest.files.map((file: any) => {
        const { content, ...fileRest } = file;
        return fileRest;
      });
    }

    return rest;
  });

  // Write the complete registry to a single file
  await writeFileRecursive(
    COMPLETE_REGISTRY_PATH,
    JSON.stringify({ registry: processedRegistry }, null, 2)
  );

  console.log(`✅ Complete registry generated at ${COMPLETE_REGISTRY_PATH}`);
};

const main = async () => {
  for (let i = 0; i < registry.length; i++) {
    const component = registry[i];
    const files = component.files;
    delete component.component; // Delete `component` property since not needed in the public registry
    if (!files) throw new Error("No files found for component");

    const filesArray = await getComponentFiles(files, component.type);

    const json = JSON.stringify(
      {
        ...component,
        files: filesArray,
      },
      null,
      2
    );
    const jsonPath = `${PUBLIC_FOLDER_BASE_PATH}/${component.name}.json`;
    await writeFileRecursive(jsonPath, json);
    // console.log(json);
  }

  // Generate the complete registry.json file
  await generateCompleteRegistry();
};

main()
  .then(() => {
    console.log("✅ Done - Registry built");
  })
  .catch((err) => {
    console.error(err);
  });
