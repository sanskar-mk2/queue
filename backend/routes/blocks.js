const express = require("express");
const {
    store,
    index,
    show,
    destroy,
    update,
    upsert,
} = require("../controllers/BlockController");
const RequireAuth = require("../middleware/RequireAuth");

const router = express.Router();

router.use(RequireAuth);

router.get("/", index);
router.post("/", store);

router.get("/:id", show);
router.patch("/:id", update);
router.put("/", upsert);

router.delete("/:id", destroy);

module.exports = router;
