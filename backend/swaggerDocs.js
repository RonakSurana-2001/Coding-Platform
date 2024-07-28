const swaggerSpecs = {
    "openapi": "3.0.0",
    "info": {
        "title": "Coding Platform (WeCode)",
        "description": "These are API Docs for Coding Platform.",
        "version": "0.1.9"
    },
    "servers": [
        {
            "url": "https://coding-app-xwu4.onrender.com",
        },
        {
            "url": "http://localhost:3001",
        }
    ],
    "components": {
        "schemas": {
            "questionSchema": {
                "type": 'object',
                "properties": {
                    "name": {
                        "type": "string",
                    },
                    "linkQues": {
                        "type": "string",
                    },
                    "Topic": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "Level": {
                        "type": "string"
                    },
                    "sno": {
                        "type": "number"
                    },
                    "question": {
                        "type": "string"
                    }
                }
            },
            "userSchema": {
                "type": 'object',
                "properties": {
                    "_id": {
                        "type": "string",
                    },
                    "userId": {
                        "type": "string",
                    },
                    "problemsSolved": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "savedQues": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "__v":{
                        "type":"number"
                    }
                }
            }
        },
    },
    "paths": {
        "/app/createQuestions": {
            "post": {
                "tags": ["Questions"],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/questionSchema"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Question is Created",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/questionSchema"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/app/sendQuestions": {
            "post": {
                "tags": ["Questions"],
                "responses": {
                    "200": {
                        "description": "List of all questions",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/questionSchema"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/app/sendParticularQuestion": {
            "post": {
                "tags": ["Questions"],
                "requestBody": {
                    "description": "Question Number is Taken",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties":{
                                    "id":{
                                        "type":"number"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Particular Question is Send",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/questionSchema"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/auth/getUser":{
            "post": {
                "tags": ["Users"],
                "requestBody": {
                    "description": "User Details",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties":{
                                    "userId":{
                                        "type":"string"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "User Details",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/userSchema"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/auth/getUpdate":{
            "post": {
                "tags": ["Users"],
                "requestBody": {
                    "description": "User Details",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties":{
                                    "userId":{
                                        "type":"string"
                                    },
                                    "quesNo":{
                                        "type":"string"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200":{
                        "description":"Successfulyy",
                        "content":{
                            "application/json":{
                                "schema":{
                                    "type":"string",
                                    "example":"Saved/Deleted"
                                }
                            }
                        }
                    },
                    "400":{
                        "description":"Bad Request, e.g., missing or invalid parameters"
                    },
                    "500":{
                        "description":'Internal Server Error'
                    }
                }
            }
        },
        "/auth/savedQues":{
            "post":{
                "tags": ["Users"],
                "description":"Saves or unsaved a question from the saved question list",
                "requestBody":{
                    "content":{
                        "application/json":{
                            "schema":{
                                "type":"object",
                                "properties":{
                                    "userId":{
                                        "type":"string",
                                        "description": "The ID of the user",
                                        "example": "user123"                      
                                    },
                                    "quesNo":{
                                        "type": "string",
                                        "description": "The question number to be saved or deleted",
                                        "example": "ques456"                      
                                    }
                                }
                            }
                        }
                    }
                },
                "responses":{
                    "200":{
                        "description":"Successfulyy",
                        "content":{
                            "application/json":{
                                "schema":{
                                    "type":"string",
                                    "example":"Saved/Deleted"
                                }
                            }
                        }
                    },
                    "400":{
                        "description":"Bad Request, e.g., missing or invalid parameters"
                    },
                    "500":{
                        "description":'Internal Server Error'
                    }
                }
            }
        },
        "/auth/adminDetails":{
            "post":{
                "tags": ["Users"],
                "description":"Add or Remove Admin",
                "requestBody":{
                    "content":{
                        "application/json":{
                            "schema":{
                                "type":"object",
                                "properties":{
                                    "emailId":{
                                        "type":"string",
                                        "description": "The EmailId of the user",
                                        "example": "user@mail.com"                      
                                    },
                                    "type":{
                                        "type": "string",
                                        "description": "is user admin or not",
                                        "example": "true/false"                      
                                    }
                                }
                            }
                        }
                    }
                },
                "responses":{
                    "200":{
                        "description":"Successfully",
                        "content":{
                            "application/json":{
                                "schema":{
                                    "type":"object"
                                }
                            }
                        }
                    },
                    "404":{
                        "description":"Bad Request, e.g., missing or invalid parameters",
                        "content":{
                            "application/json":{
                                "schema":{
                                    "type":"object",
                                    "properties":{
                                        "error":{
                                            "type":"string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "500":{
                        "description":'Internal Server Error',
                        "content":{
                            "application/json":{
                                "schema":{
                                    "type":"object",
                                    "properties":{
                                        "error":{
                                            "type":"string"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

module.exports = swaggerSpecs