import React, { useContext, useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { BiExport } from 'react-icons/bi';
import { Button, Checkbox, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FaPlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { GoTrash } from 'react-icons/go';
import { myContext } from '../../App';
import { deleteData, editData, fetchDataFromApi, postData } from '../utils/api';
import { Select, MenuItem} from '@mui/material';

const SubCategory = () => {
  const [open, setOpen] = useState(false);
  const [subCatData, setSubCatData] = useState({ subCategoryList: [], totalPages: 1 });
  const [editId, setEditId] = useState(null);
  const [formFields, setFormFields] = useState({ category: '', subCat: '' });
  const [categoryVal,setCategoryVal]=useState('');
  const [catData,setCatData]=useState({ categoryList: [], totalPages: 1 });

  const context = useContext(myContext);

   const fetchCategory = () => {
      fetchDataFromApi('/category?all=true').then((res) => {
        if (res && Array.isArray(res.categoryList)) {
          console.log("products:",res.categoryList)
            setCatData({ categoryList: res.categoryList, totalPages: 1 });
        } else {
            console.error("Invalid category response:", res);
        }
    }).catch(error => console.error("Error fetching categories:", error));
  };
  

  const fetchingSubCategory = () => {
    window.scrollTo(0,0);
    context.setProgress(20);
    fetchDataFromApi('/subcategory')
      .then((res) => {
        console.log("API response for subcategories:", res);
        setSubCatData(res);
        context.setProgress(100);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };
  
  useEffect(() => {
    fetchCategory();
    fetchingSubCategory();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setFormFields({ category: '', subCat:'' });
  };

  const handleChangeCategory=(e)=>{
   setCategoryVal(e.target.value);
   setFormFields(()=>({
    ...formFields,
    category:e.target.value
   }))
  }

  const deleteCat = async (id) => {
    deleteData(`/subcategory/${id}`).then(res=>{
      fetchDataFromApi(`/subcategory`).then((res)=>{
        setSubCatData(res);
      })
    })
  };

  const handleChange = (event, value) => {
    context.setProgress(40);
     fetchDataFromApi(`/subcategory?page=${value}`).then((res) => {
      setSubCatData(res);
      console.log(res);
      context.setProgress(100);
    });
  };

  const PostEditCategory = async (event) => {
    event.preventDefault();
  
    if (!formFields.category) {
      context.setAlertBox({
        open: true,
        error: true,
        msg: 'Please select a category'
      });
      return;
    }
  
    if (!formFields.subCat) {
      context.setAlertBox({
        open: true,
        error: true,
        msg: 'Please enter a subcategory'
      });
      return;
    }
  
    try {
      let response;
      if (editId) {
        response = await editData(`/subcategory/${editId}`, formFields);
      } else {
        response = await postData('/subcategory', formFields);
      }

      context.setAlertBox({
        open: true,
        error: false,
        msg: 'Sub Category Updated successfully!'
      });
      setFormFields({ category:'', subCat:''});

      setTimeout(() => {
        window.location.href = "/subcategory/list";
      }, 1000);
      
    } catch (error) {
      console.error('Error updating category:', error);
      alert('An error occurred while updating the category.');
    }
  };
  
  
  const FetchEditCategory = (id) => {
    setEditId(id);
    setOpen(true);
    fetchDataFromApi(`/subcategory/${id}`)
      .then((res) => {
       setSubCatData(res);
       setCategoryVal(res.category.id);
       setFormFields(()=>({
        ...formFields,
        category:res.category.id,
        subCat:res.subCat
       }))
      })
      .catch((error) => console.error("Error fetching subcategory for edit:", error));
};

// const FetchEditCategory = (id) => {
//   setEditId(id);
//   setOpen(true);
  
//   fetchDataFromApi(`/subcategory/${id}`)
//     .then((res) => {
//       setCategoryVal(res.category.id);
//       setFormFields({
//         category: res.category.id,
//         subCat: res.subCat
//       });
//     })
//     .catch((error) => console.error("Error fetching subcategory for edit:", error));
// };


const handleEditChange = (e) => {
  const { name, value } = e.target;
  setFormFields(() => ({
    ...formFields,
    [name]: value,  // Update the respective field
  }));
};

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow rounded-lg">
        <h2 className="text-[19px] font-[700] text-gray-700">Sub Category List</h2>
        <div className="col w-[27%] ml-auto flex items-center gap-3">
          <Button className="btn-green text-white px-4 py-2 btn-sm flex items-center">
            <BiExport className="text-lg mr-2" /> Export
          </Button>
          <Button
            className="btn-blue !bg-blue-600 btn-sm rounded-md hover:bg-blue-700"
            onClick={() => context.setisOpenFullScreenPanel({ open: true, model: 'Add Sub Category'})}>
            <FaPlus className="text-[20px] pb-1 pr-1" /> Add Sub Category
          </Button>
        </div>
      </div>

      <div className="shadow-md sm:rounded-lg bg-white text-gray-900 card mx-2 my-2">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3"><Checkbox size="small" /></th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Sub Category</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {subCatData?.subCategoryList?.length!==0 && subCatData?.subCategoryList?.map((item, index) => (
                <tr key={index} className="odd:bg-white border-b border-gray-200 even:bg-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-3"><Checkbox size="small" /></td>
                  <td className="px-6 py-2 font-medium">{item.category?.name}</td>
                  <td className="px-6 py-2 font-medium">{item.subCat}</td>
                  <td className="px-6 py-2">
                    <div className="flex justify-center gap-1">
                    <Button onClick={() => FetchEditCategory(item._id)} className="!w-[35px] !h-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:bg-[#b0b0b0] bg-[#f1f1f1] !min-w-[35px]">
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                    <Button className="hover:text-red-600 !w-[35px] !h-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:bg-[#b0b0b0] bg-[#f1f1f1] !min-w-[35px]">
                      <GoTrash className="text-[rgba(0,0,0,0.7)] text-[20px]" onClick={()=>deleteCat(item._id)} />
                    </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       
         {
          subCatData?.totalPages > 1 &&
          <div className="flex justify-end p-4">
          <Pagination count={subCatData?.totalPages} color="primary" className='pagination' showFirstButton showLastButton onChange={handleChange} />
        </div>
        }

      </div>

      <Dialog open={open} onClose={handleClose} className="rounded-lg editModal">
        <DialogTitle className="bg-gray-100 font-semibold text-lg text-gray-700">Edit Category</DialogTitle>
        <form onSubmit={PostEditCategory}>
          <DialogContent className="p-6">
          {catData?.categoryList?.length > 0 && (

        <Select
        fullWidth
        size="small"
        value={categoryVal}
        onChange={handleChangeCategory}
        name="category"
        className="!my-2"
    >
        <MenuItem value="">None</MenuItem>
        {catData.categoryList.map((cat, index) => (
            <MenuItem key={index} value={cat._id}>
                {cat.name}</MenuItem>
        ))}
    </Select>
)}
             <TextField
              required
              name="subCat"
              label="Sub Category"
              fullWidth
              value={formFields.subCat}
              onChange={handleEditChange}
              className="!my-10"
            />
          </DialogContent>
          <DialogActions className="p-4 my-5">
            <Button type="submit" className="btn-blue bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Submit</Button>
            <Button onClick={handleClose} className="bg-gray-400 text-white px-4 py-2 btn-red rounded-md hover:bg-gray-500">Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default SubCategory;
