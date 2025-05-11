import React, { useContext, useMemo, useState, useEffect } from 'react';
import { Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip, CircularProgress, InputAdornment, IconButton, OutlinedInput, InputLabel, FormControl, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CustomProvider } from 'app/layouts/vertical-default/VerticalDefault';
import { BsSearch } from 'react-icons/bs';

export default function NewTrialsTable(props) {
    const { t } = useTranslation();
    const { loginUserData } = useContext(CustomProvider);
    // const [refRevenue, setRefRevenue] = useState({ per1: 0, per2: 0 });
    const { refUsers, isAffiliateLoading } = props || {};

    const { new_trails, totalUsersCount } = refUsers || {}
    let showStatus = true;
    if (props.hasOwnProperty('showStatus')) {
        showStatus = props.showStatus;
    }

    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const handleSearch = debounce((value) => {
        const searchValue = value.toLowerCase();
        const filtered = new_trails?.filter((row) => {
            const senderName = `${row.firstname || ""} ${row.lastname || ""}`.toLowerCase();
            return senderName.includes(searchValue);
        });
        setFilteredData(filtered);
    }, 500);

    useMemo(() => {
        handleSearch(searchQuery);
    }, [searchQuery]);

    const [currentPage, setCurrentPage] = useState(1);
    const [currentUsers, setCurrentUsers] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [activeButtons, setActiveButtons] = useState({ Level1: true, Level2: true });

    const totalPages = itemsPerPage === 0
        ? 1
        : Math.ceil((filteredData?.length ? filteredData?.length : 1) / itemsPerPage);


    const indexOfLastUser = itemsPerPage === 0 ? new_trails.length : currentPage * itemsPerPage;
    const indexOfFirstUser = itemsPerPage === 0 ? 0 : indexOfLastUser - itemsPerPage;

    const color = {
        "Active": "#2c73ff",
        "payment_failed": "#FF4500",
        "subscription_cancelled": "#ff4d4f",
        "subscription_reactivated": "#22C55E",
    };

    const memoizedFormatDate = useMemo(() => {
        return (dateInput, isUnix = false) => {
            const date = isUnix ? new Date(dateInput * 1000) : new Date(dateInput);
            const day = date.getDate();
            const year = date.getFullYear();
            const month = date.toLocaleString('en-US', { month: 'long' });
            const translatedMonth = t(`pages.title.${month}`);
            return `${translatedMonth} ${day}, ${year}`;
        };
    }, []);


    const calEstRevenue = (user) => {
        if (!user?.t_paid_amount && !user?.plan_price) return 0;
        let rev = (user?.t_paid_amount || user?.plan_price) * 0.4
        return rev
    };

    const getLabel = (status) => {
        switch (status) {
            case 'Active':
                return t("pages.title.In Trial");
            case 'payment_failed':
                return t("pages.title.Payment Failed");
            case 'subscription_cancelled':
                return t("pages.title.Cancelled");
            case 'subscription_reactivated':
                return t("pages.title.Reactivated");
            default:
                return t("pages.title.Unknown");
        }
    };

    const handleButtonClick = (button) => {
        setActiveButtons((prevState) => {
            const newState = { ...prevState, [button]: !prevState[button] };

            if (!newState.Level1 && !newState.Level2) {
                return prevState;
            }
            return newState;
        });
    };

    useEffect(() => {
        // Start with the base data
        let dataToFilter = searchQuery ? filteredData : new_trails;

        // Apply filtering based on active buttons
        if (activeButtons.Level1 && !activeButtons.Level2) {
            dataToFilter = dataToFilter?.filter((userData) =>
                Number(userData?.sponsorid) === loginUserData?.user_id
            );
        } else if (!activeButtons.Level1 && activeButtons.Level2) {
            dataToFilter = dataToFilter?.filter((userData) =>
                Number(userData?.sponsorid) !== loginUserData?.user_id
            );
        }
        const paginatedData = dataToFilter?.slice(indexOfFirstUser, indexOfLastUser);
        setCurrentUsers(paginatedData);

        setFilteredData(dataToFilter);
    }, [currentPage, new_trails, filteredData, itemsPerPage, searchQuery, activeButtons]);

    useEffect(() => {
        setCurrentPage(1); // Reset to first page on new search
    }, [searchQuery]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (isAffiliateLoading) {
        return (
            <div className="table-outer-box" style={{
                height: "400px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <>
            <div className="oct-affiliate-strip" style={{
                height: "90px",
                backgroundColor: "white",
                fontSize: "18px",
                lineHeight: "24px",
                fontWeight: "600",
                color: "rgb(23, 15, 73)",
            }}>
                <div className="oct-affiliate-stripInner" >
                    {t("pages.title.new-trials")}

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0 20px",
                        marginLeft: "20px",

                    }}>
                        {/* <Button
							variant={activeButtons.Level1 ? 'contained' : 'outlined'}
							onClick={() => handleButtonClick('Level1')}
						>
							{t("pages.title.Level1")}
						</Button>
						<Button
							variant={activeButtons.Level2 ? 'contained' : 'outlined'}
							onClick={() => handleButtonClick('Level2')}
						>
							{t("pages.title.Level2")}
						</Button> */}
                    </div>


                </div>
                <div className="title-area-left" style={{
                    // boxShadow: "0px 0 5px 0 rgba(0, 0, 0, .5)", borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <FormControl sx={{ width: "25ch" }} variant="outlined">
                        <InputLabel htmlFor="search">{t("pages.title.Search")}</InputLabel>
                        <OutlinedInput
                            id="search"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            startAdornment={
                                <InputAdornment position="center">
                                    <IconButton edge="end">
                                        <BsSearch />
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Search"
                        />
                    </FormControl>
                </div>
            </div>
            <div className="table-outer-box">
                <TableContainer className='sep-AffiliateTable-div' component={Paper} elevation={3}>
                    <Table className='sep-AffiliateTable-main' aria-label="customer table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f4f6f8' }}>
                                <TableCell align="center"><Typography variant="subtitle2">#</Typography></TableCell>
                                <TableCell><Typography variant="subtitle2">{t("pages.title.Name")}</Typography></TableCell>
                                <TableCell align="center"><Typography variant="subtitle2">{t("pages.title.Plan")}</Typography></TableCell>
                                <TableCell align="center"><Typography variant="subtitle2">{t("pages.title.Period")}</Typography></TableCell>
                                <TableCell align="center"><Typography variant="subtitle2">{t("pages.title.Price")}</Typography></TableCell>
                                <TableCell align="center"><Typography variant="subtitle2">{t("pages.title.Estimated Revenue")}</Typography></TableCell>
                                <TableCell align="center"><Typography variant="subtitle2">{t("pages.title.Joining Date")}</Typography></TableCell>
                                <TableCell align="center"><Typography variant="subtitle2">{t("pages.title.Activation on")}</Typography></TableCell>
                                {/* <TableCell align="center"><Typography variant="subtitle2">{t("pages.title.Sponsor By")}</Typography></TableCell> */}
                                <TableCell align="center"><Typography variant="subtitle2">{t("pages.title.Status")}</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!currentUsers?.length ? (
                                <TableRow>
                                    <TableCell colSpan={10} align="center" sx={{ padding: '16px' }}>
                                        <Typography variant="body1" color="textSecondary">{t("pages.title.Noanynewsaleincurrentmonth")}</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                currentUsers.map((userData, index) => (
                                    <TableRow
                                        key={`${userData?.customerid}-${index}`}
                                        sx={{
                                            backgroundColor: index % 2 === 0 ? '#f6f6f6' : 'inherit',
                                            '&:hover': { backgroundColor: '#f1f3f5' },
                                            transition: 'background-color 0.3s ease',
                                        }}
                                    >
                                        <TableCell align="center">{indexOfFirstUser + index + 1}</TableCell>
                                        <TableCell align="left">
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <Avatar alt="Avatar" sx={{ width: 40, height: 40 }} />
                                                <div>
                                                    <Typography variant="body2" sx={{ fontWeight: '500' }}>{`${userData?.firstname} ${userData?.lastname}`}</Typography>
                                                    <Typography variant="body2" sx={{ color: '#888', fontSize: '0.65rem' }}>
                                                        {Number(userData?.sponsorid) === loginUserData?.user_id ? userData?.email || ' ' : ' '}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="center">{userData?.plan_pkg === "Unlimited_new" ? "Unlimited" : userData?.plan_pkg}</TableCell>
                                        <TableCell align="center">
                                            {(userData?.sub_type === "year" ? 12 : userData?.plan_period)}{" "}
                                            {(userData?.plan_period === 0 || userData?.plan_period === 1) && userData?.sub_type === "month"
                                                ? t("pages.title.Month")
                                                : t("pages.title.Months")}
                                        </TableCell>
                                        <TableCell align="center">{`${userData?.plan_price} ${userData?.currency === "USD" ? "$" : "€"}`}</TableCell>
                                        <TableCell align="center">
                                            {`${calEstRevenue(userData).toFixed(2)} ${userData?.currency === "USD" ? "$" : "€"}`}
                                        </TableCell>
                                        <TableCell align="center">{memoizedFormatDate(userData?.createdat)}</TableCell>
                                        <TableCell align="center">
                                            {userData?.trial_end === 0
                                                ? memoizedFormatDate(userData?.createdat)
                                                : memoizedFormatDate(userData?.trial_end, true)}
                                        </TableCell>
                                        {/* <TableCell align="center">
											{Number(userData?.sponsorid) === loginUserData?.user_id ? t("pages.title.You") : userData?.sponsor_name}
										</TableCell> */}
                                        {/* <TableCell align="center">
											{userData?.trial_status === 'Active' &&
												<Chip label={
												userData.trial_status === "Active" && userData.subscription_status !== "payment_failed"
													? getLabel(userData.trial_status) 
													: getLabel(userData.subscription_status) 
												}
													sx={{
														backgroundColor: userData.subscription_status === "payment_failed"
															? color["payment_failed"]
															: color[userData.trial_status] || color["Unknown"],
														color: '#fff',
														width: '80px',
														textAlign: 'center',
													}} />
												
											}
											
										</TableCell> */}
                                        <TableCell>
                                            {userData?.subscription_status && (
                                                <Chip
                                                    label={getLabel(userData.subscription_status)}
                                                    sx={{
                                                        backgroundColor: color[userData.subscription_status] || '#ccc',
                                                        color: '#fff',
                                                        width: '120px',
                                                        textAlign: 'center',
                                                    }}
                                                />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <NewTrialsTablePagination
                    t={t}
                    skip={indexOfFirstUser}
                    limit={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    itemsPerPage={itemsPerPage}
                    page={currentPage}
                    totalPages={totalPages}
                    onPageChange={paginate}
                />
            </div>

        </>
    );
}

const NewTrialsTablePagination = ({ t, page, totalPages, onPageChange, setItemsPerPage, itemsPerPage }) => {

    const handleNext = () => {
        if (page < totalPages) onPageChange(page + 1);
    };

    const handlePrev = () => {
        if (page > 1) onPageChange(page - 1);
    };

    const handlePageClick = (pageNumber) => {
        onPageChange(pageNumber);
    };

    const renderPageNumbers = () => {
        const pages = [];

        if (totalPages <= 10) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
            console.log("in 10")
        } else {
            pages.push(1, 2);
            if (page > 4) pages.push('...');
            const start = Math.max(3, page - 2);
            const end = Math.min(totalPages - 2, page + 2);
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            if (page < totalPages - 3) pages.push('...');
            pages.push(totalPages - 1, totalPages);
        }
        console.log(pages)
        return pages;
    };

    const handleItemsPerPageChange = (event) => {
        const value = event.target.value === t("pages.title.View All") ? 0 : Number(event.target.value);
        setItemsPerPage(value);
        onPageChange(1); // Reset to first page
    };

    const btnStyle = {
        backgroundColor: "#fff",
        color: "grey",
        padding: "5px 15px",
        margin: "0 5px",
        borderRadius: "5px",
    };

    return (
        <div style={{ padding: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "290px"
            }}>
                <label htmlFor="items-per-page" style={{
                    width: "110px"
                }}>{t("pages.title.Items per page")}:</label>
                <select
                    id="items-per-page"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    style={{
                        padding: '5px 10px',
                        borderRadius: '5px',
                        width: 'auto',
                        minWidth: "80px"
                    }}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="0">{t("pages.title.View All")}</option>
                </select>
            </div>


            <div>
                {
                    itemsPerPage !== 0 && <div>
                        <button
                            onClick={handlePrev}
                            disabled={page === 1}
                            style={btnStyle}
                        >
                            {'<'}
                        </button>

                        {renderPageNumbers().map((pageNumber, index) => (
                            <button
                                key={index}
                                onClick={() => pageNumber !== '...' && handlePageClick(pageNumber)}
                                disabled={pageNumber === page || pageNumber === '...'}
                                style={{
                                    ...btnStyle,
                                    backgroundColor: pageNumber === page ? '#2c73ff' : '#f4f5f5',
                                    color: pageNumber === page ? 'white' : 'black',
                                    cursor: pageNumber === '...' ? 'default' : 'pointer',
                                }}
                            >
                                {pageNumber}
                            </button>
                        ))}

                        <button
                            onClick={handleNext}
                            disabled={page === totalPages}
                            style={btnStyle}
                        >
                            {'>'}
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

