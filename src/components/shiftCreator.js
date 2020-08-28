import React, { useState } from "react"
import moment from "moment"

import { TimePicker, DatePicker, InputNumber, Select } from "antd"

import { FcCalendar } from "react-icons/fc"
import { BsClockFill, BsClock } from "react-icons/bs"
import { FaMapMarkedAlt, FaCheck } from "react-icons/fa"
import { BiEuro } from "react-icons/bi"
import { ImCross } from "react-icons/im"
import { GiLargePaintBrush } from "react-icons/gi"

import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/cjs/Button"

const timeFormat = 'HH:mm';
const dateFormat = 'YYYY/MM/DD';

export default function ShiftCreator( props ) {
	const [value, onChange] = useState(['10:00', '11:00']);

	return (
		<Card id="component_shiftCreator">
			<Card.Header>Register new Shift</Card.Header>
			<Card.Body>
				<Form>
					<Form.Row>
						{/* Date input */}
						<Col>
							<InputGroup style={{ minWidth: "11rem" }}>
								<InputGroup.Prepend>
									<InputGroup.Text id="shiftCreator_date_field"><FcCalendar /></InputGroup.Text>
								</InputGroup.Prepend>
								<DatePicker
									className=" form-control datePicker_workedDate"
									format={dateFormat}
									placeholder="Date"
									aria-label="Date"
									aria-describedby="shiftCreator_date_field"
								/>
							</InputGroup>
						</Col>
						{/* Range time input */}
						<Col>
							<InputGroup style={{ minWidth: '11rem' }}>
								<InputGroup.Prepend>
									<InputGroup.Text id="shiftCreator_time_start"><BsClockFill /></InputGroup.Text>
								</InputGroup.Prepend>
								<TimePicker.RangePicker
									className="form-control timeRangePicker_workedTime"
									suffixIcon={null}
									clearIcon={null}
									allowClear={false}
									format={timeFormat}
									placeholder={["Start", "End"]}
									aria-describedby="shiftCreator_time_start"
								/>
							</InputGroup>
						</Col>
						{/* Location select */}
						<Col>
							<InputGroup style={{ minWidth: '18.5rem' }}>
								<InputGroup.Prepend>
									<InputGroup.Text id="shiftCreator_location"><FaMapMarkedAlt /></InputGroup.Text>
								</InputGroup.Prepend>
								<Select
									style={{ padding: 0 }}
									className="form-control select_workedLocation"
									bordered={false}
									placeholder="Location"
									aria-label="Location"
									aria-describedby="shiftCreator_location"
									>
									<Select.Option value="enum_id_1">Enum name 1</Select.Option>
									<Select.Option value="enum_id_2">Enum name 2</Select.Option>
									<Select.Option value="enum_id_3">Aéroport Lyon Saint Exupery</Select.Option>
								</Select>
							</InputGroup>
						</Col>
						{/* Bonus number input */}
						<Col>
							<InputGroup style={{ minWidth: "9rem" }}>
								<InputGroup.Prepend>
									<InputGroup.Text id="shiftCreator_bonus"><BiEuro /></InputGroup.Text>
								</InputGroup.Prepend>
								<InputNumber
									style={{ padding: "0.1rem 0" }}
									className="form-control inpuNumber_workedBonus"
									min={0}
									step={0.01}
									placeholder="Bonus"
									aria-label="Bonus"
									aria-describedby="shiftCreator_bonus"
								/>
							</InputGroup>
						</Col>
					</Form.Row>
					{/* form button */}
					<Form.Row style={{ marginTop: "1rem" }}>
						<Col>
							<Button variant="primary" block><FaCheck /></Button>
						</Col>
						<Col sm={2}>
							<Button variant="danger" block><GiLargePaintBrush style={{ fontSize: "1.3rem" }} /></Button>
						</Col>
					</Form.Row>
				</Form>
			</Card.Body>
		</Card>
	)
}

/*

                            <div class="form-group row mt-3 mb-0">
                                <div class="col pr-1">
                                    <button type="submit" class="btn btn-primary btn-block" data-toggle="tooltip" data-placement="top" title="Save new shift"><i class="far fa-check-circle text-light" style="font-size: 25px"></i></button>
                                </div>

                                <div class="col-md-2">
                                    <button type="reset" class="btn btn-danger btn-block" data-toggle="tooltip" data-placement="left" title="Reset form field"><i class="far fa-minus-square" style="font-size: 25px"></i></button>
                                </div>
                            </div> <!-- submit / reset -->

 */