import React from "react"
import Datepicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Table from "../component/Table"
import Modal from "../component/Modal"

export default function ViewExpensePage() {
  const [selectedDate, setSelectedDate] = React.useState(null)
  const [filterData, setFilterData] = React.useState("")
  const [openModal, setOpenModal] = React.useState(false)
  const [tableData, setTableData] = React.useState([])
  const [modalId, setModalId] = React.useState(null)

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleFilterData = (e) => {
    setFilterData(e.target.value)
  }

  const handleModal = () => {
    setOpenModal(true)
    setModalId(null)
  }

  const addTableData = (newTableData) => {
    setTableData([...tableData, newTableData])
  }

  const findModalIdAndedit = (id) => {
    setModalId(id)
    setOpenModal(true)
  }

  return (
    <>
      <div
        className={`flex justify-between py-6 px-6 ${
          openModal ? "opacity-30" : ""
        }`}
      >
        <h2 className=' text-3xl font-bold'>MY EXPENSE MANAGER</h2>
        <div className='flex gap-4'>
          <Datepicker
            className='border-4 border-gray-600 p-1'
            selected={selectedDate}
            placeholderText='Filter by Date of Expense'
            dateFormat={"dd/MM/yyyy"}
            onChange={handleDateChange}
          />
          <input
            className='border-4 border-gray-600 p-1'
            type='text'
            value={filterData}
            onChange={handleFilterData}
            placeholder='Search by Expense Name'
          />
          <button
            className=' bg-green-500 text-white p-1 px-5'
            onClick={handleModal}
          >
            + New Expense
          </button>
        </div>
      </div>
      <div className={`${openModal ? " opacity-20" : ""}`}>
        <Table
          selectedDate={selectedDate}
          filterData={filterData}
          tableData={tableData}
          setOpenModal={setOpenModal}
          findModalIdAndedit={findModalIdAndedit}
          setTableData={setTableData}
        />
      </div>
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          addTableData={addTableData}
          modalId={modalId}
          tableData={tableData}
          setTableData={setTableData}
        />
      )}
    </>
  )
}
