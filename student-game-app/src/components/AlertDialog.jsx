// Import all components from Radix UI Alert Dialog
import * as AlertDialog from "@radix-ui/react-alert-dialog";
// Import component-specific styling
import "./AlertDialog.css";

/*
  PackResultDialog Component

  Props:
  - isOpen (boolean): Controls whether the dialog is visible.
  - onClose (function): Function triggered when dialog open state changes or when user clicks close.
  - pulledItem: (unused here but likely passed for future extension).
  - isDupe (boolean): Indicates whether the pulled item is a duplicate.
  - itemImage (string): URL of the pulled item's image.
  - itemName (string): Name of the pulled item.
*/
const PackResultDialog = ({ isOpen, onClose, pulledItem, isDupe, itemImage, itemName }) => (
	// Root wrapper for the dialog. Controlled via isOpen.
	<AlertDialog.Root open={isOpen} onOpenChange={onClose}>
		{/* Portal renders the dialog outside normal DOM hierarchy */}
		<AlertDialog.Portal>

			{/* Dark overlay behind the dialog */}
			<AlertDialog.Overlay className="AlertDialogOverlay" />

			{/* Main dialog container */}
			<AlertDialog.Content className="AlertDialogContent">

				{/* Dialog title showing pulled item name */}
				<AlertDialog.Title className="AlertDialogTitle">
					Your blind pick: {itemName || "[Loading...]"}
				</AlertDialog.Title>
				
				{/* Conditionally render item image if available */}
				{itemImage && (
					<div style={{ textAlign: "center", margin: "20px 0" }}>
						<img 
							src={itemImage} 
							alt={itemName} 
							style={{ maxWidth: "200px", maxHeight: "200px", borderRadius: "8px" }}
						/>
					</div>
				)}

				{/* Description text changes depending on duplicate status */}
				<AlertDialog.Description className="AlertDialogDescription">
					{isDupe ? (
						"This is a dupe :( Better luck next time!"
					) : (
						"Good work! Turn in more assignments to earn packs :)"
					)}
				</AlertDialog.Description>

				{/* Action button container aligned to bottom right */}
				<div style={{ display: "flex", gap: 25, justifyContent: "flex-end", marginTop: "20px" }}>
					<AlertDialog.Action asChild>
						<button className="Button violet" onClick={onClose}>
							Got it!
						</button>
					</AlertDialog.Action>
				</div>

			</AlertDialog.Content>
		</AlertDialog.Portal>
	</AlertDialog.Root>
);

// Export component for use in other files
export default PackResultDialog;
