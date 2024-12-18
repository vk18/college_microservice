const express = require('express');
const courseData = require('./data');

const app = express();
const PORT = 3003;

app.get('/courses', (req, res) => {
    const { branch, semester } = req.query;

    if (branch && semester) {
        const filteredCourses = courseData.filter(
            course =>
                course.branch.toLowerCase() === branch.toLowerCase() &&
                course.semester == semester
        );

        if (filteredCourses.length > 0) {
            return res.json(filteredCourses);
        }
        return res.status(404).json({ message: "No courses found for the given criteria." });
    }

    res.json(courseData);
});

app.listen(PORT, () => {
    console.log(`Courses microservice running at http://localhost:${PORT}`);
});
