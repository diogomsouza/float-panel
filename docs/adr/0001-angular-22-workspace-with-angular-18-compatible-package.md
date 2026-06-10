# Angular 22 Workspace With Angular 18 Compatible Package

The package will be developed in an Angular 22 workspace while remaining consumable by Angular 18 and newer applications. This keeps the project current for development and demo work while constraining the public library API and peer dependency range so consuming applications on Angular 18+ are not forced to upgrade immediately.

## Consequences

- Public Angular and CDK usage must avoid APIs unavailable to Angular 18 consumers.
- Release validation should include package metadata checks for an Angular 18+ peer dependency range.
- The first release does not require a dedicated Angular 18 consumer app in this repository.
