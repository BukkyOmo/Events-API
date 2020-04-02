const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000 || process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const events = [];

const schema = buildSchema(`
    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String! 
    }

    type RootQuery {
        events: [Event!]!
    } 
    type RootMutation {
        createEvent(eventInput: EventInput): Event
    }
    schema {
        query: RootQuery,
        mutation: RootMutation
    }`
)

app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: {
            events: () => {
                return events;
            },

            createEvent: args => {
                const event = {
                    _id: Math.random().toString(),
                    title: args.eventInput.title,
                    description: args.eventInput.description,
                    price: +args.eventInput.price,
                    date: args.eventInput.date
                };
                events.push(event);
                return event;
            }
        },
        graphiql: true
}));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello Events API.',
        statusCode: 200,
        status: 'Success'
    })
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});
