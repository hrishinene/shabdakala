import classnames from 'classnames'
import { iCellProto } from "../../lib/internal/iCellProto";
import { ZDummyObject } from "../../lib/internal/ZDummyObject"
import { ZCellAddress } from '../../lib/internal/ZCellAddress';
import {motion} from "framer-motion";
//import {vibrate} from "./CGameProto"
//import { useState } from 'react';

const shakeVariants = {
  shake: {
    x: [0, -2, 2, -2, 2, 0], // Keyframes for shaking left and right
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  normal: {
    x: 0, // Default position
  },

};

interface CCellProtoProps {
  cellProto: iCellProto;
  onClick:(cellAddress:ZCellAddress)=>void;
}

function handleCellClick(cellProt: iCellProto, onClickCallback: (cellAddress: ZCellAddress) => void) {
  cellProt.selectCell();
  onClickCallback(cellProt.address);
}

export const CCellProto = ({cellProto, onClick} : CCellProtoProps) => {
  const classes = classnames(
    'w-[150px] h-[80px]',
    'border-solid border-0 flex items-center justify-center mx-1 text-xl font-bold rounded dark:text-white', // Reduced font size
    {
      'bg-[#f4f4f5] dark:bg-slate-800 border-slate-300 dark:border-slate-600': !cellProto.isSelected,
      'bg-custom-dark-gray text-white': cellProto.isSelected,
      'bg-white text-black': !cellProto.isSelected && cellProto.getWord(),
      'border-black dark:border-slate-100': cellProto.getWord(),
      'cell-animation': !!cellProto,
    }
  )
  return (
            <motion.button className={classes} onClick={() => handleCellClick(cellProto, onClick)} animate={cellProto.isVibarting ? "shake" : "normal"}
            variants={shakeVariants} whileTap={{ scale: 0.95}}>
              {cellProto.getWord()}
            </motion.button>
  )
}