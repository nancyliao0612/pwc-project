import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TextField = styled.div`
  margin: 10px 0;
  span {
    color: var(--theme-color);
  }
  @media only screen and (min-width: 768px) {
    margin: 15px 0;
  }
`;

export default function Form() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, company, taxID, email, address, phone } = data;
    try {
      const response = await axios.post("/api/respondents", {
        name,
        company,
        taxID,
        email,
        address,
        phone,
      });
    } catch (error) {
      console.log(error);
    }
    if (
      data.taxID !==
      ("04016004" ||
        "22102494" ||
        "27737101" ||
        "54338542" ||
        "24471212" ||
        "24933919" ||
        "52540210" ||
        "94998251" ||
        "80190853" ||
        "97115921" ||
        "24957480" ||
        "53933810" ||
        "24953604" ||
        "04111302" ||
        "97479675" ||
        "54177736" ||
        "28172279" ||
        "70480262" ||
        "48865995" ||
        "99330806")
    ) {
      window.open("https://www.google.com.tw/");
    } else {
      navigate("/reply");
    }
  };

  const handleTaxIdValidation = (taxID) => {
    let one = taxID.split("")[0] * 1;
    let two = taxID.split("")[1] * 2;
    let three = taxID.split("")[2] * 1;
    let four = taxID.split("")[3] * 2;
    let five = taxID.split("")[4] * 1;
    let six = taxID.split("")[5] * 2;
    let seven = taxID.split("")[6] * 4;
    let eight = taxID.split("")[7] * 1;

    const sum = [one, two, three, four, five, six, seven, eight];

    let total = 0;
    for (let i = 0; i < sum.length; i++) {
      if (sum[i] * 10 >= 100) {
        sum[i] = sum[i].toString();
        sum[i] = Number(sum[i].split("")[0]) + Number(sum[i].split("")[1]);
      }
      total = total + sum[i];
    }
    return total % 10 === 0;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField>
        <h2 htmlFor="name">
          姓名<span>*</span>
        </h2>
        <input
          {...register("name", { required: "Please enter a valid value" })}
        />
        <p>{errors.name?.message}</p>
      </TextField>
      <TextField>
        <h2 htmlFor="company">
          公司/單位<span>*</span>
        </h2>
        <input
          {...register("company", { required: "Please enter a valid value" })}
        />
        <p>{errors.company?.message}</p>
      </TextField>
      <TextField>
        <h2 htmlFor="taxID">
          統一編號<span>*</span>
        </h2>
        <input
          {...register("taxID", {
            required: true,
            validate: handleTaxIdValidation,
          })}
        />
        {(errors.taxID || errors.taxID?.type === "validate") && (
          <p>請填寫正確統一編號</p>
        )}
      </TextField>
      <TextField>
        <h2 htmlFor="email">
          電子郵件<span>*</span>
        </h2>
        <input
          {...register("email", {
            required: "Field does not contain a valid email address",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Field does not contain a valid email address",
            },
          })}
        />
        <p>{errors.email?.message}</p>
      </TextField>
      <TextField>
        <h2 htmlFor="address">
          聯絡地址<span>*</span>
        </h2>
        <input
          {...register("address", {
            required: "Please enter a valid value",
          })}
        />
        <p>{errors.address?.message}</p>
      </TextField>
      <TextField>
        <h2 htmlFor="phone">
          聯絡電話<span>*</span>
        </h2>
        <input
          {...register("phone", { required: "Please enter a valid value" })}
        />
        <p>{errors.phone?.message}</p>
      </TextField>
      <br />
      <button type="submit">送出</button>
    </form>
  );
}
