import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import express from 'express';
import ViteExpress from "vite-express";

const sdl = /* GraphQL */`
    struct SDUIView @oneOf {
        box: SDUIBox
        button: SDUIButton
        text: SDUIText
    }

    struct SDUIBox {
        backgroundColor: String
        padding: Int
        children: [SDUIView]
    }

    struct SDUIButton {
        label: String
        href: String
        children: [SDUIView]
    }

    struct SDUIText {
        isBold: Boolean
        string: String
    }

    type Query {
        pageLayout(page: String!): SDUIView
    }
`;

const resolvers = {
    pageLayout() {
        return {
            box: {
                backgroundColor: "#1a1a2e",
                padding: 24,
                children: [
                    {
                        text: { isBold: false, string: "Up to 40% off select items. Ends midnight." }
                    },
                    {
                        box: {
                            backgroundColor: "#16213e",
                            padding: 16,
                            children: [
                                {
                                    text: { isBold: true, string: "TEAM — $14.99/mo" }
                                },
                                {
                                    text: { isBold: false, string: "was $24.99" }
                                },
                                {
                                    button: {
                                        label: "Get Team",
                                        href: "/checkout?plan=team&promo=SUMMER40",
                                        children: []
                                    }
                                }
                            ]
                        }
                    },
                ]
            }
        }
    },
};

const app = express().all(
    '/graphql',
    createHandler({
        schema: buildSchema(sdl),
        rootValue: resolvers,
    }),
);

const server = ViteExpress.listen(app, 8080, () => {
    const address = server.address();
    const host = address.address === '::' ? 'localhost' : address.address;
    const port = address.port;
    console.log(`Server is listening on http://${host}:${port}`);
});

