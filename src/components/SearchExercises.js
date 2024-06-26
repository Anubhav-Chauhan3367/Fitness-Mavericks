import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import { exerciseOptions, fetchData } from "../utils/fetchData";
import HorizontalScrollbar from "./HorizontalScrollbar";
import Loader from "./Loader"; // Import Loader

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
	const [search, setSearch] = useState("");
	const [bodyParts, setBodyParts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchExercisesData = async () => {
			setLoading(true);
			setError(null);

			try {
				const bodyPartsData = await fetchData(
					"https://exercisedb.p.rapidapi.com/exercises/bodyPartList?limit=0",
					exerciseOptions
				);

				setBodyParts(["all", ...bodyPartsData]);
			} catch (error) {
				setError("Failed to fetch body parts. Please try again later.");
				console.error("Fetch error:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchExercisesData();
	}, []);

	const handleSearch = async () => {
		if (search) {
			setLoading(true);
			setError(null);

			try {
				const exercisesData = await fetchData(
					"https://exercisedb.p.rapidapi.com/exercises?limit=0",
					exerciseOptions
				);

				const searchedExercises = exercisesData.filter(
					(item) =>
						item.name.toLowerCase().includes(search) ||
						item.target.toLowerCase().includes(search) ||
						item.equipment.toLowerCase().includes(search) ||
						item.bodyPart.toLowerCase().includes(search)
				);

				window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });

				setSearch("");
				setExercises(searchedExercises);
			} catch (error) {
				setError("Failed to fetch exercises. Please try again later.");
				console.error("Search error:", error);
			} finally {
				setLoading(false);
			}
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	if (loading) return <Loader />;

	if (error) {
		return (
			<Box id="search" sx={{ mt: { lg: "109px" } }} mt="50px" p="20px">
				<Typography variant="h4" color="error" textAlign="center">
					{error}
				</Typography>
			</Box>
		);
	}

	return (
		<Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
			<Typography
				fontWeight={700}
				sx={{ fontSize: { lg: "44px", xs: "30px" } }}
				mb="49px"
				textAlign="center"
			>
				Awesome Exercises You <br /> Should Know
			</Typography>
			<Box position="relative" mb="72px">
				<TextField
					height="76px"
					sx={{
						input: {
							fontWeight: "700",
							border: "none",
							borderRadius: "40px",
						},
						width: { lg: "1170px", xs: "350px" },
						paddingLeft: "35px",
						backgroundColor: "#fff",
						border: "1px solid #42f560",
						borderRadius: "40px",
						"& fieldset": {
							border: "none",
						},
					}}
					value={search}
					onChange={(e) => setSearch(e.target.value.toLowerCase())}
					onKeyDown={handleKeyDown}
					placeholder="Search Exercises"
					type="text"
				/>
				<Button
					className="search-btn"
					sx={{
						bgcolor: "#42f560",
						color: "#fff",
						textTransform: "none",
						width: { lg: "173px", xs: "80px" },
						height: "56px",
						position: "absolute",
						right: "0px",
						fontSize: { lg: "20px", xs: "14px" },
						border: "none",
						borderEndEndRadius: "40px",
						borderStartEndRadius: "40px",
					}}
					onClick={handleSearch}
				>
					Search
				</Button>
			</Box>
			<Box sx={{ position: "relative", width: "100%", p: "20px" }}>
				<HorizontalScrollbar
					data={bodyParts}
					bodyParts
					setBodyPart={setBodyPart}
					bodyPart={bodyPart}
				/>
			</Box>
		</Stack>
	);
};

export default SearchExercises;
