
# Campayn API Documentation

## Base URL
```
https://api.campayn.app/v1
```

## Authentication
All API requests require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Campaigns

### GET /campaigns
Retrieve campaigns with filtering and pagination.

**Query Parameters:**
- `status` (string): Filter by status (draft, live, paused, completed, cancelled)
- `dateRange` (string): Format "YYYY-MM-DD,YYYY-MM-DD"
- `search` (string): Search by campaign name
- `page` (integer): Page number (default: 1)
- `limit` (integer): Items per page (default: 20, max: 100)
- `sort` (string): Sort field (name, startDate, budget)
- `order` (string): Sort order (asc, desc)

**Response:**
```json
{
  "data": [Campaign],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### GET /campaigns/{id}
Get specific campaign details.

### POST /campaigns
Create a new campaign.

### PUT /campaigns/{id}
Update campaign details.

### POST /campaigns/{id}/pause
Pause an active campaign.

### POST /campaigns/{id}/resume  
Resume a paused campaign.

### POST /campaigns/{id}/clone
Clone a campaign with optional modifications.

### GET /campaigns/{id}/metrics
Get detailed campaign metrics.

**Query Parameters:**
- `period` (string): Time period (7d, 30d, 90d, custom)
- `startDate` (string): Start date for custom period
- `endDate` (string): End date for custom period

## Creators

### GET /creators
Retrieve creators with filtering and sorting.

**Query Parameters:**
- `sort` (string): Sort by engagement, cpm, followers, rating
- `platform` (string): Filter by platform
- `minFollowers` (integer): Minimum follower count
- `maxFollowers` (integer): Maximum follower count
- `location` (string): Filter by location
- `verified` (boolean): Filter verified creators only

### GET /creators/{id}
Get specific creator profile.

### POST /creators/{id}/invite
Invite creator to campaign.

**Request Body:**
```json
{
  "campaignId": "uuid",
  "message": "string",
  "compensation": {
    "amount": 1000,
    "currency": "USD",
    "type": "fixed" // or "performance"
  }
}
```

### GET /creators/{id}/metrics
Get creator performance metrics.

## Payments

### GET /payments
Retrieve payments with filtering.

**Query Parameters:**
- `status` (string): Filter by payment status
- `campaignId` (string): Filter by campaign
- `creatorId` (string): Filter by creator
- `dueDateRange` (string): Filter by due date range

### POST /payments/process
Process pending payments.

**Request Body:**
```json
{
  "paymentIds": ["uuid1", "uuid2"],
  "method": "bulk" // or "individual"
}
```

### POST /payments/{id}/retry
Retry a failed payment.

## Alerts

### GET /alerts
Get active alerts.

### POST /alerts
Create custom alert.

**Request Body:**
```json
{
  "type": "budget_low",
  "entityType": "campaign",
  "entityId": "uuid",
  "threshold": 90,
  "channels": ["in_app", "email"]
}
```

### PUT /alerts/{id}/acknowledge
Mark alert as acknowledged.

### DELETE /alerts/{id}
Dismiss alert.

## Reports

### POST /reports/export
Generate and export report.

**Request Body:**
```json
{
  "type": "engagement_overview", // or "roi_analysis", "demographics", "custom"
  "format": "pdf", // or "csv", "excel"
  "dateRange": {
    "start": "2024-01-01",
    "end": "2024-01-31"
  },
  "filters": {
    "campaignIds": ["uuid1", "uuid2"],
    "creatorIds": ["uuid1", "uuid2"]
  },
  "delivery": {
    "method": "download", // or "email"
    "email": "user@example.com"
  }
}
```

### GET /reports/{id}/download
Download generated report.

## WebSocket Events

### Real-time Updates
Connect to: `wss://api.campayn.app/v1/ws`

**Event Types:**
- `campaign_updated`: Campaign status or metrics changed
- `payment_processed`: Payment status updated
- `alert_triggered`: New alert created
- `kpi_updated`: Real-time KPI updates

**Event Format:**
```json
{
  "type": "campaign_updated",
  "data": {
    "campaignId": "uuid",
    "changes": ["status", "metrics"],
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      {
        "field": "budget.total",
        "message": "Must be greater than 0"
      }
    ]
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR` (400): Request validation failed
- `UNAUTHORIZED` (401): Invalid or missing authentication
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `RATE_LIMITED` (429): Too many requests
- `SERVER_ERROR` (500): Internal server error

## Rate Limiting
- 1000 requests per hour per API key
- 100 requests per minute for real-time endpoints
- Headers included in response:
  - `X-RateLimit-Limit`: Request limit
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Reset time (Unix timestamp)
