import React, { useState } from "react"
import Datepicker from "react-datepicker"
import { v4 as uuid } from "uuid"

export default function Modal({
  setOpenModal,
  addTableData,
  modalId,
  tableData,
  setTableData,
}) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState(null)
  const [amount, setAmount] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  const options = [
    { value: "", label: "Select category" },
    { value: "Health", label: "Health" },
    { value: "Electronic", label: "Electronic" },
    { value: "Travel", label: "Travel" },
    { value: "Education", label: "Education" },
    { value: "Books", label: "Books" },
    { value: "Others", label: "Others" },
  ]

  const data = tableData.find((item) => item.id === modalId)

  React.useEffect(() => {
    if (data) {
      setName(data.name)
      setDescription(data.description)
      setCategory(data.category)
      setDate(data.date)
      setAmount(data.amount)
      setIsEditing(true)
    }
  }, [data])

  const expenseId = uuid()

  const handleSubmit = (e) => {
    e.preventDefault()
    const expenseDetails = {
      id: expenseId,
      name,
      description,
      category,
      date,
      amount,
      uploadedAt: Date.now(),
      createdBy: "Me(username)",
    }

    if (isEditing) {
      // Find the index of the existing expense in tableData
      const expenseIndex = tableData.findIndex((item) => item.id === modalId)

      // Update the expense in tableData
      if (expenseIndex !== -1) {
        const updatedTableData = [...tableData]
        updatedTableData[expenseIndex] = expenseDetails
        setTableData(updatedTableData)
      }
    } else {
      // Add a new expense
      addTableData(expenseDetails)
    }

    setOpenModal(false)
  }
  const handleCancel = (e) => {
    e.preventDefault()
    setOpenModal(false)
  }

  return (
    <div className=' fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
      <div className=' bg-blue-400 p-4 rounded-lg shadow-md w-1/4'>
        <h1 className=' font-bold text-2xl py-4'>
          {isEditing ? "Edit Expense" : "Create New Expense"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className='pb-4'>
            <h3 className=' font-bold text-xl pb-1'>Name</h3>
            <input
              className=' min-w-full h-9 pl-6 bg-gray-300 text-black font-bold'
              value={name}
              onChange={(e) => setName(e.target.value)}
              type='text'
              placeholder='Name the Expense'
              maxLength={140}
            />
          </div>
          <div className='pb-4'>
            <h3 className=' font-bold text-xl pb-1'>Description</h3>
            <textarea
              className=' min-w-full h-9 pl-6 pt-1 bg-gray-300 text-black font-bold'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type='text'
              placeholder='Describe the Expense'
            />
          </div>
          <div className='pb-4'>
            <h3 className=' font-bold text-xl pb-1 '>Category</h3>
            <select
              className='min-w-full h-9 pl-6 bg-gray-300 text-black font-bold'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {options.map((data, index) => (
                <option key={index} value={data.value}>
                  {data.label}
                </option>
              ))}
            </select>
          </div>
          <div className='pb-4 w-full'>
            <h3 className=' font-bold text-xl pb-1'>Date of Expense</h3>
            <Datepicker
              className='pl-6 w-full p-1 bg-gray-300 text-black font-bold'
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat={"dd/MM/yyyy"}
              placeholderText='Date of Expense'
            />
          </div>
          <div className='pb-4'>
            <h3 className=' font-bold text-xl pb-1'>Expense Amount</h3>
            <input
              className=' min-w-full h-9 pl-6 bg-gray-300 text-black font-bold'
              type='number'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder='Expense Amount in INR'
            />
          </div>
          <div className='flex justify-between pt-2'>
            <button
              onClick={handleCancel}
              className=' bg-gray-600 pl-9 pr-9 pt-2 pb-2 font-bold text-white'
            >
              Cancel
            </button>
            <button
              className=' bg-green-600 pl-9 pr-9 pt-2 pb-2 text-white'
              type='submit'
            >
              {isEditing ? "Update expense" : "Create Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
