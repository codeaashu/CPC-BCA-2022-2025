package com.ecomproject.domain;

public enum AccountStatus {

    PENDING_VERIFICATION,       // Account is created but not yet verified
    ACTIVE,                     // Account is active and in good standing
    SUSPENDED,                  // Account is temporarily suspended, possibly due to violations
    DEACTIVATED,                // Account is deactivated, user may have chosen to deactivate it
    BANNED,                     // Account is permanently banned due to severe violations
    CLOSED,                     // Account is permanently closed, possibly at user request
}
