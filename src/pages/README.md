# Pages Directory Structure

This directory contains all page-level components organized by feature/domain.

## Directory Organization

### `/auth` - Authentication Pages

Contains all authentication-related pages:

- `Login.tsx` - User login page
- `Signup.tsx` - User registration page
- `ForgotPassword.tsx` - Password recovery page

**Import Example:**

```typescript
import { Login, Signup, ForgotPassword } from '@/pages/auth';
```

### `/invoice` - Invoice Management Pages

Contains all invoice-related components and pages:

- `AdvancedOptions.tsx` - Advanced invoice configuration options (HSN, tax summary, etc.)
- `BillingDetails.tsx` - Billed By and Billed To sections
- `DocumentActions.tsx` - Signature, terms, notes, attachments, contact details
- `InvoiceConfiguration.tsx` - Tax configuration, currency selection, column customization
- `InvoiceItemsTable.tsx` - Invoice line items table with add/edit/delete functionality
- `InvoiceTotals.tsx` - Invoice totals, discounts, additional charges
- `ShippingDetails.tsx` - Shipping from/to address management
- `TransportDetails.tsx` - Transport and delivery information

**Import Example:**

```typescript
import { AdvancedOptions, BillingDetails, InvoiceConfiguration } from '@/pages/invoice';
```

### `/After-Login` - Post-Authentication Pages

Contains pages accessible after user login.

### `/invoice-templates` - Invoice Templates

Contains different invoice template variations.

## Naming Conventions

### File Names

- Use PascalCase for component files: `InvoiceConfiguration.tsx`
- Match file name with the default export function name
- Be descriptive and specific: `InvoiceItemsTable` instead of `ItemTable`

### Function Names

- Component function names should match the file name
- Example: File `InvoiceConfiguration.tsx` exports `function InvoiceConfiguration()`

### Import Paths

- Use relative imports within the same feature folder
- Use centralized exports from `index.ts` for cross-feature imports
- Store imports: `import { useAppDispatch } from '../../store'`

## Best Practices

1. **Single Responsibility**: Each file should have one primary component
2. **Consistent Naming**: File name = Function name = Export name
3. **Organized Imports**: Group imports by type (React, libraries, local)
4. **Type Safety**: Use TypeScript interfaces for props
5. **Centralized Exports**: Use index.ts files for cleaner imports

## Migration Notes

### Old → New File Names

- `AdvanceOptions.tsx` → `AdvancedOptions.tsx`
- `ItemHeader.tsx` → `InvoiceConfiguration.tsx`
- `SixItem.tsx` → `DocumentActions.tsx`
- `ItemTable.tsx` → `InvoiceItemsTable.tsx`
- `Total.tsx` → `InvoiceTotals.tsx`
- `Billed.tsx` → `BillingDetails.tsx`

### Old → New Function Names

- `AdvancedOptionsUI()` → `AdvancedOptions()`
- `CurrencyConfigUI()` → `InvoiceConfiguration()`
- `DocumentActionsUI()` → `DocumentActions()`
- `BillingDetailsSection()` → `BillingDetails()`
