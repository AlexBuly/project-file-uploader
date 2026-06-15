const prisma = require("../lib/prisma");
const fs = require("fs");

const readAllFolders = async (req, res) => {
  const folders = await prisma.folder.findMany({
    where: { userId: req.user.id },
  });

  res.render("folders", { folders });
};


const createFolder = async (req, res) => {
   await prisma.folder.create({
      data: {
         name: req.body.name,
         userId: req.user.id
      }
   });
   res.redirect("/folders")
}

 const readSingleFolder = async (req, res) => {
    const folder = await prisma.folder.findUnique({
    where: { id: req.params.id },
    include: { files: true },
  });

  if (!folder || folder.userId !== req.user.id) {
    return res.status(403).send("Forbidden");
  }

  res.render("folder", { folder });
 }

 const updateFolder = async (req, res) => {
    await prisma.folder.update({
    where: { id: req.params.id },
    data: { name: req.body.name },
  });

  res.redirect("/folders");
 }

 const deleteFolder = async (req, res) => {
  const files = await prisma.file.findMany({
    where: { folderId: req.params.id },
  });

  files.forEach((file) => {
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
  });

  await prisma.file.deleteMany({
    where: { folderId: req.params.id },
  });

  await prisma.folder.delete({
    where: { id: req.params.id },
  });

  res.redirect("/folders");
};

const uploadFile = async (req, res) => {
  const folder = await prisma.folder.findUnique({
    where: { id: req.params.id },
  });

  if (!folder || folder.userId !== req.user.id) {
    return res.status(403).send("Forbidden");
  }

  await prisma.file.create({
    data: {
      filename: req.file.filename,
      path: req.file.path,
      folderId: folder.id,
      userId: req.user.id,
    },
  });

  res.redirect(`/folders/${folder.id}`);
};

const deleteFile = async (req, res) => {
  const file = await prisma.file.findUnique({
    where: { id: req.params.id },
  });

  if (!file || file.userId !== req.user.id) {
    return res.status(403).send("Forbidden");
  }

  if (fs.existsSync(file.path)) {
    fs.unlinkSync(file.path);
  }

  await prisma.file.delete({
    where: { id: file.id },
  });

  res.redirect(`/folders/${file.folderId}`);
};

module.exports = {
   readAllFolders,
   readSingleFolder,
   createFolder,
   updateFolder,
   deleteFolder,
   uploadFile,
   deleteFile
}