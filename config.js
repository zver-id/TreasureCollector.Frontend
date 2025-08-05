const config = {
    dev: {
        apiUrl: "http://localhost:5000",
    },
    prod: {
        apiUrl: "http://localhost:5186",
    },
};

export default import.meta.env.MODE === "development" ? config.dev : config.prod;