import { Box, Checkbox, Typography } from "@mui/material";
import React, { useState } from "react";
import upArrow from "../../../assets/admin/Content/upArrow.png";
import downArrow from "../../../assets/admin/Content/downArrow.png";
import videopause from "../../../assets/admin/Content/video-pause-button 1.png"
import deleteIcon from "../../../assets/admin/Content/deleteIcon.png";
import editIcon from "../../../assets/admin/Content/editIcon.png";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

function NotificationsTable({  data, loading }) {
  const navigate = useNavigate();
  const [mainChecked, setMainChecked] = useState(false);
  return (
    <Box className="notifications-table">
      <table>
        <thead>
          <th>
            <td style={{ flex: 1 }}>
            <Checkbox
                checked={mainChecked}
                sx={{
                  color: "#DCDCDC",
                  "&.Mui-checked": {
                    color: "#FFAE00",
                  },
                }}
                onChange={() => setMainChecked(!mainChecked)}
              />
            </td>
            <td style={{ flex: 5 }}>
              <Typography className="heading-text">Subject</Typography>
            </td>
            <td style={{ flex: 5 }}>
              <Typography className="heading-text">Message</Typography>
            </td>
            <td style={{ flex: 3 }}>
              <Typography className="heading-text">Audience</Typography>
            </td>
            <td style={{ flex: 3 }}>
              <Box className="sorting-header">
                <Typography className="heading-text">Type</Typography>
                <Box className="sorting-container">
                  <img src={upArrow} alt="arrow up" />
                  <img src={downArrow} alt="arrow down" />
                </Box>
              </Box>
            </td>
            <td style={{ flex: 3 }}>
              <Box className="sorting-header">
                <Typography className="heading-text">Frequency</Typography>
                <Box className="sorting-container">
                  <img src={upArrow} alt="arrow up" />
                  <img src={downArrow} alt="arrow down" />
                </Box>
              </Box>
            </td>
            <td style={{ flex: 3 }}>
              <Box className="sorting-header">
                <Typography className="heading-text">Reach</Typography>
                <Box className="sorting-container">
                  <img src={upArrow} alt="arrow up" />
                  <img src={downArrow} alt="arrow down" />
                </Box>
              </Box>
            </td>
            <td style={{ flex: 3 }}>
              <Box className="sorting-header">
                <Typography className="heading-text">Opened</Typography>
                <Box className="sorting-container">
                  <img src={upArrow} alt="arrow up" />
                  <img src={downArrow} alt="arrow down" />
                </Box>
              </Box>
            </td>
            <td style={{ flex: 3 }}>
              <Box className="sorting-header">
                <Typography className="heading-text">Open Rate</Typography>
                <Box className="sorting-container">
                  <img src={upArrow} alt="arrow up" />
                  <img src={downArrow} alt="arrow down" />
                </Box>
              </Box>
            </td>
            <td style={{ flex: 2 }}>
              <Box className="sorting-header">
                <Typography className="heading-text">Status</Typography>
                <Box className="sorting-container">
                  <img src={upArrow} alt="arrow up" />
                  <img src={downArrow} alt="arrow down" />
                </Box>
              </Box>
            </td>
            <td style={{ flex: 2 }}>
              <Typography className="heading-text">Actions</Typography>
            </td>
          </th>
        </thead>
        <tbody id="table-body">
            {data.map((row, index) => (
              <tr key={index}>
                <td style={{ flex: 1 }}>
                  <Checkbox
                    checked={row?.checked || mainChecked}
                    sx={{
                      color: "#DCDCDC",
                      "&.Mui-checked": {
                        color: "#FFAE00",
                      },
                    }}
                  />
                </td>
                <td style={{ flex: 5 }}>
                  <Box className="content-area">
                      <Box className="content-details-area">
                        <Typography className="title">
                          {row.subject}
                        </Typography>
                        <Box className="tags-container">
                          {row.tags.map((tag, index) => (
                            <Box className="tag-group">
                              <Typography className="tag-text">
                                {tag}
                              </Typography>
                              {/* {index + 1 !== row.tags.length && (
                                <img src={dot} alt="divider" />
                              )} */}
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                </td>
                <td style={{ flex: 5 }}>
                  <Typography className="row-content-normal pr">
                    {row.message}
                    <a className="readmore" href="#">Read More</a>
                  </Typography>
                </td>
                <td style={{ flex: 3 }}>
                  <Typography className="row-content-normal">
                    {row.audience}
                  </Typography>
                </td>
                <td style={{ flex: 3 }}>
                  <Typography className="row-content-normal">
                    {row?.type}
                  </Typography>
                </td>
                <td style={{ flex: 3 }}>
                  <Typography className="row-content-normal">
                    {row?.frequency}
                  </Typography>
                </td>
                <td style={{ flex: 3 }}>
                  <Typography className="row-content-normal">
                    {row?.reach}
                  </Typography>
                </td>
                <td style={{ flex: 3 }}>
                  <Typography className="row-content-normal">
                    {row?.opened}
                  </Typography>
                </td>
                <td style={{ flex: 3 }}>
                  <Typography className="row-content-normal">
                    {row?.openrate}
                  </Typography>
                </td>
                <td style={{ flex: 2 }}>
                  <Typography className="row-content-normal title">
                    {row?.status}
                  </Typography>
                </td>
                <td style={{ flex: 2 }}>
                  <Box className="actions-container">
                    <img src={videopause} alt="pause" />
                    <img src={editIcon} alt="edit" onClick={() => navigate("/notifications/edit")} />
                    <img src={deleteIcon} alt="delete" />
                  </Box>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Box>
  )
}

export default NotificationsTable