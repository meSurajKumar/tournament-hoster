"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authRoutes = require('../routes/authRoutes');
const adminRouter = require('../routes/adminRoutes');
module.exports = function (app) {
    app.get('/', (req, res) => {
        return res.status(200).send(`Welcome to tournament-hoster`);
    });
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/admin', adminRouter);
    app.use('*', (req, res) => {
        return res.status(400).send(`Route You are looking for not exists!`);
    });
};
