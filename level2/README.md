
# GitHub Actions Workflows

This repository contains two GitHub Actions workflows: `build.yaml` and `pr-build.yaml`. These workflows automate the build process for different parts of the project.

---

## `build.yaml`

### Purpose
The `build.yaml` workflow is designed to manually trigger a build for a specific level folder (e.g., `level1`, `level2`). It allows developers to build the frontend, product-service, and user-service components within the specified level. You can view the workflow file [here](./.github/workflows/build.yaml).

### Trigger
This workflow is triggered manually using the `workflow_dispatch` event. It requires an input parameter `level` to specify the folder to build.

### Steps
1. **Checkout Code**: Uses the `actions/checkout` action to clone the repository.
2. **Setup Node.js**: Installs the specified Node.js version (defined in the `NODE_VERSION` environment variable).
3. **Build Specific Level**:
   - Checks if the `frontend`, `product-service`, or `user-service` directories exist within the specified level folder.
   - Runs `npm install` and `npm run build` for each detected directory.

### Example Usage
To trigger this workflow, specify the level folder (e.g., `level1`) in the GitHub Actions UI.

---

## `pr-build.yaml`

### Purpose
The `pr-build.yaml` workflow is designed to automatically build only the changed folders when a pull request is opened or updated. This ensures that only the relevant parts of the project are built, saving time and resources. You can view the workflow file [here](./.github/workflows/pr-build.yaml).

### Trigger
This workflow is triggered on pull requests targeting the `main` branch or branches matching the patterns `fix/*` or `feat/*`.

### Steps
1. **Checkout Code**: Uses the `actions/checkout` action to clone the repository.
2. **Setup Node.js**: Installs the specified Node.js version (defined in the `NODE_VERSION` environment variable).
3. **Detect Changed Folders**:
   - Fetches the latest changes and determines which folders have been modified using `git diff`.
   - Stores the list of changed folders in the `changed_folders` environment variable.
4. **Build Changed Folders**:
   - Iterates through the detected folders.
   - Checks if the `frontend`, `product-service`, or `user-service` directories exist within each folder.
   - Runs `npm install` and `npm run build` for each detected directory.

### Key Features
- Builds only the changed folders, improving efficiency.
- Supports multiple levels (e.g., `level1`, `level2`).

---

## Environment Variables

Both workflows use the following environment variable:
- `NODE_VERSION`: Specifies the version of Node.js to use (default: `20`).

---

## Notes

- Ensure that the `npm install` and `npm run build` commands are correctly configured in the `package.json` files of the respective services.
- The workflows assume a consistent folder structure (e.g., `frontend`, `product-service`, `user-service`).
