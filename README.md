# Tasks API
This API was made for an application.

# Description
This API serves for manage a simple task system.

# Docs
## Fetch all tasks
```http
GET /api/tasks
```

## Fetch a specific task
```http
GET /api/tasks/:id
```

## Create a new task
**Request:**
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Task title...",
  "description": "Task description..."
  "status": "Task status... (''Not started'' by default)"
}
```
**Response:**
```json
{
  "task": {},
  "tasks": []
}
```

## Update a task
**Request:**
```http
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description"
  "status": "Updated status"
}
```
**Response:**
```json
{
  "updatedTask": {},
  "tasks": []
}
```

## Delete a task
**Request:**
```http
DELETE /api/tasks/:id
```
**Response:**
```json
{
  "deletedTask": {},
  "tasks": []
}
```

## Queries
### Search
**Request:**
```http
GET /api/tasks?search=query
```
*Search for a task using name (case-insensitive).*
**Response:**
```json
{
  "match": [],
  "includes": [],
}
```

### Status
**Request:**
```http
GET /api/tasks?status=query
```
*Search for a task using statud (case-insensitive).*
**Response:**
```json
{
  "match": [],
  "includes": [],
}
```

# Credits
Made by:
* [TechG](https://github.com/TechG2)
