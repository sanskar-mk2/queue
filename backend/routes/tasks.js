const express = require("express");
const Task = require("../models/Task");
const {
    store,
    index,
    show,
    _delete,
    update,
    destroy,
} = require("../controllers/TaskController");
const RequireAuth = require("../middleware/RequireAuth");

const router = express.Router();

router.use(RequireAuth);

router.get("/", index);
router.post("/", store);

router.get("/:id", show);
router.patch("/:id", update);

router.delete("/:id", _delete);
router.delete("/destroy/:id", destroy);

module.exports = router;
