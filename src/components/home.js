import React, { useState } from "react";
import Table from "../pages/Table";
import Media from "../pages/Media";
import { Box, Tab, Tabs } from "@mui/material";
import Typography from '@mui/material/Typography';
import Recomendation from "../pages/Recomendation";
import Studio from "../pages/Studio";
import MediaTrend from "../pages/MediaTrend";
import Icons from "../Common/icons";
import Medias from "../Common/Media";
import IconRecomdation from "../Common/IconRecomdation";
import StudiosIcon from "../Common/StudiosIcon";
import IconMedia from "../Common/IconMedia";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function Home() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <header className="  bg-custom-1">
                <h1 className="text-3xl font-bold w-[92%] m-auto text-left pt-4 pb-4  text-black">Test Task </h1>
            </header>
            <div className="container w-[92%] m-auto mt-10">

                <Box sx={{ flexGrow: 1, display: 'flex', }} >
                    <Tabs orientation="vertical"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"

                        className="antilist-details" >
                        <Tab className="button-p" label={<Icons />} {...a11yProps(0)} />
                        <Tab className="button-p" label={<Medias />} {...a11yProps(1)} />
                        <Tab className="button-p" label={<IconRecomdation />} {...a11yProps(2)} />
                        <Tab className="button-p" label={<StudiosIcon />} {...a11yProps(3)} />
                        <Tab className="button-p" label={<IconMedia />} {...a11yProps(4)} />
                    </Tabs>

                    <TabPanel value={value} index={0}>
                        <Table />
                    </TabPanel >
                    <TabPanel value={value} index={1}>
                        <Media />
                    </TabPanel >
                    <TabPanel value={value} index={2}>
                        <Recomendation />
                    </TabPanel >
                    <TabPanel value={value} index={3}>
                        <Studio />
                    </TabPanel >
                    <TabPanel value={value} index={4}>
                        <MediaTrend />
                    </TabPanel >
                </Box>

            </div>

        </div>


    )
}

export default Home;