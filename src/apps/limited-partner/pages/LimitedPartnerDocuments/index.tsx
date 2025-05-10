import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Chip, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Document } from '../../../../types';
import UploadDocumentModal from '@components/UploadDocumentModal';
import { searchByTitle } from '@utils/uiUtils';
import Input from '@components/Input';
import { useForm } from 'react-hook-form';
import DocumentsList from '@components/DocumentsList';
import { useGetDocumentsQuery } from '@services/api/baseApi';
import { Apps } from '@src/constants/apps';
import SortDropdown from '../../../../components/SortDropdown';
import { DOCUMENTS_SORT_OPTIONS } from '../../../../constants';

const LimitedPartnerDocuments = () => {
  const { data: documentsData, isLoading: isLoadingDocuments, error: errorDocuments } = useGetDocumentsQuery();

  const { control, watch } = useForm({
    defaultValues: {
      'searchDocuments': ''
    }
  });
  const searchValue = watch('searchDocuments');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [filteredDocs, setFilteredDocs] = useState<Document[]>(documentsData || []);
  const [selectedOrientation, setSelectedOrientation] = useState<"row" | "grid">('row');
  const [sortOption, setSortOption] = useState<string>('recent');

  const handleOrientationChange = (event: React.MouseEvent<HTMLElement>, newOrientation: "row" | "grid") => {
    if (newOrientation !== null) {
      setSelectedOrientation(newOrientation);
    }
  };
  useEffect(() => {
    if (!documentsData) return;
  
    let docs = [...documentsData];
  
    // Step 1: Filter by search value
    if (searchValue) {
      docs = searchByTitle(docs, searchValue, 'name') || [];
    }
  
    // Step 2: Apply sorting based on selected option
    switch (sortOption) {
      case 'alphabetical':
        docs.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'recent':
      default:
        docs.sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        break;
    }
  
    setFilteredDocs(docs);
  }, [searchValue, documentsData, sortOption]);
  


  // useEffect(() => {
  //   const filteredDocs = documents.filter((doc) => {
  //     if (selectedTab === 'all') return true;
  //     return doc.type === selectedTab;
  //   });
  //   setFilteredDocs(filteredDocs);
  //   setValue('searchDocuments', '');
  // }, [selectedTab, documents, setValue]);
  const handleModalClose = () => {
    setIsUploadModalOpen(false);
  }

  if (isLoadingDocuments) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (errorDocuments) {
    return (
      <Box p={3}>
        <Alert severity="error">Something went wrong</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {/* Document Statistics */}
          <Box className="flex gap-3 items-center" sx={{ mb: 1 }}>
          <Typography sx={{ textAlign: 'left', fontSize: '1.5rem', lineHeight: '1.334', fontWeight: 500 }}>
          {documentsData?.length} Documents
            </Typography>
          </Box>
    
          <Box sx={{ display: "flex", gap: 2, mb: 2, width: '100%' }}>
    
            <Input
              rounded
              type="text"
              name="searchDocuments"
              control={control}
              placeholder="Search documents..."
              className="flex flex-col w-full"
            />
    
          </Box>
          <div className="flex gap-2 items-center justify-end">
        <SortDropdown options={DOCUMENTS_SORT_OPTIONS} value={sortOption}
          onChange={setSortOption}
          />
      </div>
          <DocumentsList selectedOrientation={selectedOrientation}  documents={filteredDocs} isLoading={isLoadingDocuments} />
    
          {/* Upload Modal */}
          <UploadDocumentModal
            open={isUploadModalOpen}
            onClose={handleModalClose}
          />
        </Box>
  )
}

export default LimitedPartnerDocuments