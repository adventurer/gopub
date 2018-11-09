package command

import (
	"archive/tar"
	"compress/gzip"
	"gopub/models"
	"io"
	"os"
	"path"
	"strings"
)

func Compress(srcDirPath string, destFilePath string) (destFile string, err error) {
	destFile = destFilePath + ".tar.gz"
	fw, err := os.Create(destFile)
	if err != nil {
		return "", err
	}
	defer fw.Close()

	gw := gzip.NewWriter(fw)
	defer gw.Close()

	tw := tar.NewWriter(gw)
	defer tw.Close()

	f, err := os.Open(srcDirPath)
	if err != nil {
		return "", err
	}
	fi, err := f.Stat()
	if err != nil {
		return "", err
	}
	if fi.IsDir() {
		// err = compressDir(srcDirPath, path.Base(srcDirPath), tw)
		err = compressDir(srcDirPath, path.Base(destFilePath), tw)
		if err != nil {
			return "", err
		}
	} else {
		err := compressFile(srcDirPath, fi.Name(), tw, fi)
		if err != nil {
			return "", err
		}
	}
	return
}

func CompressFiles(files []string, project *models.Project, destFilePath string) (destFile string, err error) {
	d := destFilePath + ".tar.gz"
	fw, err := os.Create(d)
	if err != nil {
		return
	}
	defer fw.Close()

	gw := gzip.NewWriter(fw)
	defer gw.Close()

	tw := tar.NewWriter(gw)
	defer tw.Close()

	for _, file := range files {
		f, err := os.Open(file)
		if err != nil {
			return "", err
		}
		fi, err := f.Stat()
		if err != nil {
			return "", err
		}
		recPath := strings.Replace(file, project.DeployFrom+"/", "", -1)
		if fi.IsDir() {
			err = compressDir(file, recPath, tw)
		} else {
			err = compressFile(file, recPath, tw, fi)
		}
		if err != nil {
			return "", err
		}
	}
	return d, nil

}

func compressDir(srcDirPath string, recPath string, tw *tar.Writer) error {
	dir, err := os.Open(srcDirPath)
	if err != nil {
		return err
	}
	defer dir.Close()

	fis, err := dir.Readdir(0)
	if err != nil {
		return err
	}
	for _, fi := range fis {
		curPath := srcDirPath + "/" + fi.Name()

		if fi.Name() != ".git" {
			continue
		}

		if fi.IsDir() {
			err = compressDir(curPath, recPath+"/"+fi.Name(), tw)
			if err != nil {
				return err
			}
		}

		err = compressFile(curPath, recPath+"/"+fi.Name(), tw, fi)
		if err != nil {
			return err
		}
	}
	return nil
}

func compressFile(srcFile string, recPath string, tw *tar.Writer, fi os.FileInfo) error {
	if fi.IsDir() {
		hdr := new(tar.Header)
		hdr.Name = recPath + "/"
		hdr.Typeflag = tar.TypeDir
		hdr.Size = 0
		hdr.Mode = int64(fi.Mode())
		hdr.ModTime = fi.ModTime()

		err := tw.WriteHeader(hdr)
		if err != nil {
			return err
		}
	} else {
		fr, err := os.Open(srcFile)
		if err != nil {
			return err
		}
		defer fr.Close()

		hdr := new(tar.Header)
		hdr.Name = recPath
		hdr.Size = fi.Size()
		hdr.Mode = int64(fi.Mode())
		hdr.ModTime = fi.ModTime()

		err = tw.WriteHeader(hdr)
		if err != nil {
			return err
		}

		_, err = io.Copy(tw, fr)
		if err != nil {
			return err
		}

	}
	return nil
}
