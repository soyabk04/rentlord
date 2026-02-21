async function passwordhashing(value) {

    try { return await bcrypt.hash(value, 10) }
    catch (err) {
        throw new Error("Password generation failed")
    }
}