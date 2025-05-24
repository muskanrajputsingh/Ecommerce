import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { myContext } from "../../App";
import { fetchDataFromApi, postData } from "../utils/api";

const AddSubCategory = () => {
  const [productCatVal, setProductCatVal] = useState("");
  const [catData, setCatData] = useState([]);
  const [formFields, setFormFields] = useState({
    category: "",
    subCat: "",
  });

  const context = useContext(myContext);

  // Function to get unique category names
  const getUniqueCategories = (categories) => {
    return categories.filter(
      (cat, index, self) => self.findIndex((c) => c.name === cat.name) === index
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    context.setProgress(20);
    fetchDataFromApi("/category?all=true").then((res) => {
      console.log(res);
      const uniqueCategories = getUniqueCategories(res.categoryList || []);
      setCatData(uniqueCategories);
      context.setProgress(100);
    });
  }, []);

  const handleChangeProductCat = (event) => {
    setProductCatVal(event.target.value);
    setFormFields((prevFields) => ({
      ...prevFields,
      category: event.target.value,
    }));
  };

  const inputChange=(e)=>{
    setFormFields(()=>({
      ...formFields,
      [e.target.name] : e.target.value
    }))
  }

  const addSubCat = (e) => {
    e.preventDefault(); 
    const formdata=new FormData();
    formdata.append('category',formFields.category)
    formdata.append('subCat',formFields.subCat)
    console.log(formFields);
    if(formFields.category ===""){
     context.setAlertBox({
      open:true,
      error:true,
      msg:'please select a category.'
     });
     return false;
    }

    if(formFields.subCat ===""){
      context.setAlertBox({
       open:true,
       error:true,
       msg:'please enter sub category.'
      });
      return false;
     }

     postData('/subcategory',formFields).then(res=>{
      // window.location="/subcategory";
      context.setAlertBox({
        open: true,
        error: false,
        msg: 'Category submitted successfully!'
      });
      setFormFields({ category: '', subCat:''});

      setTimeout(() => {
        window.location.href = "/subcategory/list";
      }, 1000);
     })
  };

  return (
    <>
      <section className="p-6 !bg-gray-50">
        <form className="form p-8 py-3" onSubmit={addSubCat}>
          <div className="scroll max-h-[70vh] overflow-y-scroll pt-4">
            <div className="grid grid-cols-1 mb-3">
              {/* Product Category Dropdown */}
              <div className="col w-[25%]">
                <h3 className="text-[14px] mb-1 font-[600]">
                  Product Category
                </h3>
                <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                className="w-full"
                value={productCatVal}
                label="Category"
                name="category"
                onChange={handleChangeProductCat}
              >
                <MenuItem value="">
                  <em value={null}>None</em>
                </MenuItem>
                {catData.length > 0 &&
                  catData.map((cat, index) => (
                    <MenuItem className="text-capitalize" key={index} value={cat._id}>  
                      {cat.name}
                    </MenuItem>
                  ))}
              </Select>
              </div>

              {/* Sub Category Name Input */}
              <div className="col my-5">
                <h3 className="text-[14px] mb-1 font-[600]">
                  Sub Category Name
                </h3>
                <input
                  type="text"
                  className="h-[40px] border border-[rgba(0,0,0,0.3)] w-[340px] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
                  name="subCat" onChange={inputChange}
                />
              </div>
            </div>

            <br />
          </div>

          {/* Submit Button */}
          <div className="w-[250px]">
            <Button type="submit" className="btn-blue btn-lg w-full flex gap-3">
              <FaCloudUploadAlt className="text-[25px] text-white" />
              Publish and View
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddSubCategory;
