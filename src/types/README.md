# TypeScript Type Definitions

This directory contains TypeScript type definitions and interfaces that ensure type safety throughout the frontend application. These types define the shape of data structures, API responses, and component props used across the IKIAG application.

## Purpose

The type definitions serve several critical functions:

- **Type Safety**: Prevent runtime errors by catching type mismatches at compile time
- **Developer Experience**: Provide autocomplete and IntelliSense support in IDEs
- **Documentation**: Act as living documentation of data structures
- **Refactoring Safety**: Enable safe code refactoring with confidence
- **API Contracts**: Define interfaces between different parts of the application

## Type Files

### `screenshots.ts`

Defines the core data structure for screenshot management:

#### `Screenshot` Interface

```typescript
interface Screenshot {
  id: string; // Unique identifier for the screenshot
  path: string; // File system path to the screenshot image
  preview: string; // Base64-encoded preview image for UI display
  timestamp: number; // Unix timestamp of when the screenshot was taken
}
```

**Usage Context**:

- **Screenshot queues**: Used in both main and extra screenshot queues
- **UI components**: Displayed in screenshot galleries and previews
- **IPC communication**: Transferred between main and renderer processes
- **State management**: Managed by TanStack Query for caching and updates

**Data Flow**:

1. **Creation**: Generated by `ScreenshotHelper.ts` in the main process
2. **Transmission**: Sent to renderer via IPC handlers
3. **Display**: Rendered in React components with preview images
4. **Cleanup**: Removed from queues and file system when no longer needed

## Global Type Extensions

### Window Interface Extensions

The application extends the global `Window` interface to include:

- **`electronAPI`**: Interface for main process communication
- **`__IS_INITIALIZED__`**: Flag for tracking application initialization state

### Electron API Types

Defines the structure of the `electronAPI` object exposed via the preload script:

- **IPC method signatures**: Type definitions for all main process communication
- **Event listener types**: Callback function signatures for main-to-renderer events
- **Return type definitions**: Expected response types from main process calls

## Type Safety Patterns

### Strict Typing

- **No `any` types**: All types are explicitly defined to maintain type safety
- **Union types**: Used for state machines and enumerated values
- **Optional properties**: Clearly marked with `?` for properties that may be undefined
- **Readonly properties**: Immutable data structures where appropriate

### Generic Types

- **Component props**: Generic types for reusable component interfaces
- **API responses**: Parameterized types for different API response shapes
- **State management**: Generic types for query and mutation states

### Type Guards

- **Runtime validation**: Functions that verify data matches expected types
- **API response validation**: Ensure external data conforms to internal types
- **Error boundary types**: Specific error types for different failure modes

## Integration with External Libraries

### TanStack Query Types

- **Query key types**: Strongly typed query keys for cache management
- **Query function types**: Return types for data fetching functions
- **Mutation types**: Input and output types for data mutations

### React Types

- **Component prop types**: Interface definitions for all component props
- **Event handler types**: Typed event handlers for user interactions
- **Hook return types**: Typed returns from custom hooks

### Electron Types

- **IPC message types**: Structured types for inter-process communication
- **Main process types**: Types for main process state and methods
- **Preload script types**: Interface definitions for the context bridge

## Development Workflow

### Type-First Development

1. **Define types first**: Create type definitions before implementing functionality
2. **Interface contracts**: Establish clear contracts between components and services
3. **Iterative refinement**: Evolve types as understanding of requirements deepens
4. **Validation**: Use types to validate runtime data and catch errors early

### Type Documentation

- **JSDoc comments**: Comprehensive documentation for complex types
- **Usage examples**: Inline examples showing how types should be used
- **Migration notes**: Documentation for type changes and breaking updates
- **Related types**: Cross-references to related type definitions

## Best Practices

### Naming Conventions

- **PascalCase**: For interfaces, types, and enums
- **Descriptive names**: Clear, self-documenting type names
- **Namespace prefixes**: Logical grouping of related types
- **Consistent suffixes**: Standard patterns like `Props`, `State`, `Config`

### Type Organization

- **Single responsibility**: Each file focuses on related type definitions
- **Logical grouping**: Types grouped by feature or domain
- **Import/export patterns**: Clean module boundaries and exports
- **Dependency management**: Minimal coupling between type definitions

### Evolution Strategy

- **Backward compatibility**: Maintain compatibility during type updates
- **Deprecation strategy**: Clear migration path for deprecated types
- **Version tracking**: Document type changes with application versions
- **Breaking change communication**: Clear documentation of breaking changes
