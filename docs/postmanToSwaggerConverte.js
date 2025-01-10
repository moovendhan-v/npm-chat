import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    inputFile: path.join(__dirname, 'postman', 'collection.json'),
    outputFile: path.join(__dirname, 'swagger', 'swagger.json'),
    defaultInfo: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API documentation generated from Postman collection'
    }
};

function getUrlString(request) {
    if (typeof request.url === 'string') {
        return request.url;
    }
    if (request.url && request.url.raw) {
        return request.url.raw;
    }
    if (request.url && request.url.path) {
        return '/' + request.url.path.join('/');
    }
    return '';
}

function convertUrl(request) {
    const urlString = getUrlString(request);
    if (!urlString) {
        console.warn('Warning: Empty URL found in request');
        return '/';
    }

    const urlWithoutQuery = urlString.split('?')[0];
    
    return urlWithoutQuery.replace(/\/:([^/]+)/g, '/{$1}');
}

function extractQueryParams(request) {
    if (!request.url) return [];
    
    if (typeof request.url === 'string' && request.url.includes('?')) {
        const queryString = request.url.split('?')[1];
        return queryString.split('&').map(param => {
            const [key] = param.split('=');
            return {
                key,
                required: false
            };
        });
    }
    
    if (request.url.query && Array.isArray(request.url.query)) {
        return request.url.query;
    }
    
    return [];
}

function convertParameters(request) {
    const parameters = [];
    const urlString = getUrlString(request);
    
    if (urlString) {
        const pathParams = urlString.match(/\/:([^/?]+)/g) || [];
        pathParams.forEach(param => {
            const paramName = param.substring(2);
            parameters.push({
                name: paramName,
                in: 'path',
                required: true,
                schema: {
                    type: 'string'
                }
            });
        });
    }
    
    const queryParams = extractQueryParams(request);
    queryParams.forEach(query => {
        parameters.push({
            name: query.key,
            in: 'query',
            required: !!query.required,
            schema: {
                type: 'string'
            },
            description: query.description || ''
        });
    });
    
    return parameters;
}

function parseRequestBody(request) {
    try {
        if (!request.body) return null;
        
        if (request.body.mode === 'raw' && request.body.raw) {
            try {
                return JSON.parse(request.body.raw);
            } catch (e) {
                console.warn('Warning: Could not parse raw body as JSON');
                return null;
            }
        }
        
        if (request.body.mode === 'formdata' && Array.isArray(request.body.formdata)) {
            const formSchema = {};
            request.body.formdata.forEach(field => {
                formSchema[field.key] = {
                    type: 'string',
                    description: field.description || ''
                };
            });
            return formSchema;
        }
        
        return null;
    } catch (error) {
        console.warn('Warning: Error parsing request body', error);
        return null;
    }
}

async function convertPostmanToSwagger() {
    try {
        const postmanData = JSON.parse(
            await fs.promises.readFile(config.inputFile, 'utf8')
        );

        const openapi = {
            openapi: '3.0.0',
            info: config.defaultInfo,
            paths: {},
            components: {
                schemas: {},
                securitySchemes: {}
            }
        };

        function processItems(items) {
            if (!Array.isArray(items)) {
                console.warn('Warning: items is not an array');
                return;
            }

            items.forEach(item => {
                if (item.request) {
                    try {
                        const path = convertUrl(item.request);
                        const method = (item.request.method || 'GET').toLowerCase();

                        if (!openapi.paths[path]) {
                            openapi.paths[path] = {};
                        }

                        openapi.paths[path][method] = {
                            summary: item.name || '',
                            description: item.description || '',
                            parameters: convertParameters(item.request),
                            responses: {
                                '200': {
                                    description: 'Successful response'
                                }
                            }
                        };

                        const bodySchema = parseRequestBody(item.request);
                        if (bodySchema) {
                            openapi.paths[path][method].requestBody = {
                                content: {
                                    'application/json': {
                                        schema: {
                                            type: 'object',
                                            properties: bodySchema
                                        }
                                    }
                                }
                            };
                        }
                    } catch (error) {
                        console.warn(`Warning: Error processing request for ${item.name}:`, error);
                    }
                }

                if (item.item && Array.isArray(item.item)) {
                    processItems(item.item);
                }
            });
        }

        processItems(postmanData.item);

        await fs.promises.mkdir(path.dirname(config.outputFile), { recursive: true });

        await fs.promises.writeFile(
            config.outputFile,
            JSON.stringify(openapi, null, 2),
            'utf8'
        );

        console.log('Successfully converted Postman collection to OpenAPI specification');
        return true;
    } catch (error) {
        console.error('Error converting Postman collection:', error);
        return false;
    }
}

// Execute the conversion
convertPostmanToSwagger();